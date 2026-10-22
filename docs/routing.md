# Paths, methods and HEAD {#paths-methods-and-head}


Registering `GET /items/{id}` does not register every method on that path. A missing path returns 404 by default. A recognized path with an unsupported method returns 405. Use `NotFound` and `MethodNotAllowed` when those responses need an application-specific body.

```go
r := chi.NewRouter()
r.Get("/items/{id}", func(w http.ResponseWriter, req *http.Request) {
    fmt.Fprint(w, chi.URLParam(req, "id"))
})
```

The guide checks `GET /items/42`, `POST /items/42` and `GET /missing` separately. A successful parameter lookup does not prove the method fallback is correct.


## An implicit HEAD route {#an-implicit-head-route}


If a handler can serve both GET and HEAD, install `middleware.GetHead` before the routes:

```go
r := chi.NewRouter()
r.Use(middleware.GetHead)
r.Get("/items/{id}", handler)
```

`GetHead` looks for an explicit HEAD match first. When there is none, it chooses the GET route while preserving the request's HEAD method. An explicitly registered `Head` handler takes priority. The tests use a real local HTTP server and verify that a HEAD response has no body; testing only a response recorder would miss the HTTP server's role in suppressing it.


## Compose a subtree {#compose-a-subtree}


Use `Route` to create a subrouter with a path prefix. Use `Mount` to attach an existing `http.Handler`. Keep a trailing slash intentional: chi does not silently make every path with and without a slash equivalent. `RedirectSlashes` and `StripSlashes` are separate middleware choices.

The exact declarations are in the Go API tab: `Router`, `Mux.Get`, `Mux.Head`, `Mux.Route`, `Mux.Mount`, `Mux.NotFound`, `Mux.MethodNotAllowed`, `URLParam`, and `middleware.GetHead`. [Source map](https://nnyydct-ship-it.github.io/chi-field-guide/source-map.md) links them to the pinned implementation.
