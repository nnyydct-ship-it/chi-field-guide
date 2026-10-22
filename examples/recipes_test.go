package recipes_test

import (
    "context"
    "fmt"
    "io"
    "net/http"
    "net/http/httptest"
    "reflect"
    "testing"
    "time"

    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

func TestPathAndMethod(t *testing.T) {
    r := chi.NewRouter()
    r.Get("/items/{id}", func(w http.ResponseWriter, req *http.Request) {
        fmt.Fprint(w, chi.URLParam(req, "id"))
    })
    for _, tc := range []struct{ method, path, body string; status int }{
        {"GET", "/items/42", "42", http.StatusOK},
        {"POST", "/items/42", "", http.StatusMethodNotAllowed},
        {"GET", "/missing", "", http.StatusNotFound},
        {"GET", "/items/42/", "", http.StatusNotFound},
    } {
        t.Run(tc.method+tc.path, func(t *testing.T) {
            res := httptest.NewRecorder()
            r.ServeHTTP(res, httptest.NewRequest(tc.method, tc.path, nil))
            if res.Code != tc.status { t.Fatalf("status: got %d, want %d", res.Code, tc.status) }
            if tc.body != "" && res.Body.String() != tc.body { t.Fatalf("body: %q", res.Body.String()) }
        })
    }
}

func TestGetHeadUsesGETRouteAndPreservesHEAD(t *testing.T) {
    r := chi.NewRouter()
    r.Use(middleware.GetHead)
    r.Get("/items/{id}", func(w http.ResponseWriter, req *http.Request) {
        w.Header().Set("X-Observed-Method", req.Method)
        w.Header().Set("X-Item", chi.URLParam(req, "id"))
        fmt.Fprint(w, "item body")
    })
    server := httptest.NewServer(r)
    defer server.Close()
    res, err := server.Client().Head(server.URL+"/items/42")
    if err != nil { t.Fatal(err) }
    defer res.Body.Close()
    body, err := io.ReadAll(res.Body)
    if err != nil { t.Fatal(err) }
    if res.StatusCode != http.StatusOK || res.Header.Get("X-Observed-Method") != "HEAD" || res.Header.Get("X-Item") != "42" || len(body) != 0 {
        t.Fatalf("status=%d method=%q item=%q body=%q", res.StatusCode,res.Header.Get("X-Observed-Method"),res.Header.Get("X-Item"),body)
    }
}

func TestExplicitHEADTakesPriority(t *testing.T) {
    r := chi.NewRouter()
    r.Use(middleware.GetHead)
    r.Get("/item", func(w http.ResponseWriter, req *http.Request) { w.Header().Set("X-Route", "GET") })
    r.Head("/item", func(w http.ResponseWriter, req *http.Request) { w.Header().Set("X-Route", "HEAD") })
    res := httptest.NewRecorder()
    r.ServeHTTP(res,httptest.NewRequest("HEAD","/item",nil))
    if res.Code != http.StatusOK || res.Header().Get("X-Route") != "HEAD" { t.Fatalf("status=%d route=%q",res.Code,res.Header().Get("X-Route")) }
}

func TestMiddlewareNesting(t *testing.T) {
    trace := []string{}
    wrap := func(name string) func(http.Handler) http.Handler {
        return func(next http.Handler) http.Handler {
            return http.HandlerFunc(func(w http.ResponseWriter,req *http.Request) {
                trace=append(trace,name+"-in")
                next.ServeHTTP(w,req)
                trace=append(trace,name+"-out")
            })
        }
    }
    r := chi.NewRouter()
    r.Use(wrap("outer"))
    r.Group(func(g chi.Router) {
        g.Use(wrap("group"))
        g.With(wrap("inline")).Get("/report",func(w http.ResponseWriter,req *http.Request) { trace=append(trace,"handler") })
    })
    r.ServeHTTP(httptest.NewRecorder(),httptest.NewRequest("GET","/report",nil))
    want:=[]string{"outer-in","group-in","inline-in","handler","inline-out","group-out","outer-out"}
    if !reflect.DeepEqual(trace,want) { t.Fatalf("trace: got %v, want %v",trace,want) }
    t.Logf("observed: %v",trace)
}

func TestLateUsePanics(t *testing.T) {
    r := chi.NewRouter()
    r.Get("/",func(w http.ResponseWriter,req *http.Request) {})
    defer func() { if recover()==nil { t.Fatal("late Use unexpectedly succeeded") } }()
    r.Use(middleware.RequestID)
}

func TestTimeoutCancelsCooperatingHandler(t *testing.T) {
    r := chi.NewRouter()
    r.Use(middleware.Timeout(2*time.Millisecond))
    observed := false
    r.Get("/slow",func(w http.ResponseWriter,req *http.Request) {
        <-req.Context().Done()
        observed = req.Context().Err()==context.DeadlineExceeded
    })
    res := httptest.NewRecorder()
    r.ServeHTTP(res,httptest.NewRequest("GET","/slow",nil))
    if !observed || res.Code != http.StatusGatewayTimeout { t.Fatalf("deadline=%v status=%d",observed,res.Code) }
}
