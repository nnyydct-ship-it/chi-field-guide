# A router you can exercise {#a-router-you-can-exercise}


Create a router, install its middleware, then add routes. A chi router implements `http.Handler`, so Go's ordinary HTTP server and test tools work with it.

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

func main() {
    r := chi.NewRouter()
    r.Use(middleware.RequestID)
    r.Get("/hello/{name}", func(w http.ResponseWriter, req *http.Request) {
        fmt.Fprintf(w, "Hello, %s\n", chi.URLParam(req, "name"))
    })
    http.ListenAndServe(":8080", r)
}
```

`NewRouter` returns a `*Mux`; `Get` installs one method and path; `URLParam` retrieves the named path component after routing. Query parameters still come from `req.URL.Query()`. Middleware added with `Use` runs before the matching handler.


## Run this guide's examples {#run-this-guides-examples}


Clone the [guide repository](https://github.com/nnyydct-ship-it/chi-field-guide), then:

```sh
node scripts/fetch-upstream.mjs
cd examples
go test -v ./...
```

The fetch script checks out the pinned chi commit. The examples use a local Go module replacement so they exercise that checkout, rather than an unrecorded newer release. They cover path and method matching, explicit and implicit HEAD routes, middleware nesting, a late `Use`, and a cooperative timeout.

The simple server above is an introduction. The checked examples are in `examples/recipes_test.go`; see [reproduce](https://nnyydct-ship-it.github.io/chi-field-guide/reproduce.md) for their exact environment and the documentation build.
