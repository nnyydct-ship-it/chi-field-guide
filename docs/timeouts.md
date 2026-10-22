# A deadline needs a cooperating handler {#a-deadline-needs-a-cooperating-handler}


`middleware.Timeout` adds a deadline to the request context. The handler still needs to stop when the context is done. The middleware does not kill a goroutine or interrupt arbitrary work.

```go
r := chi.NewRouter()
r.Use(middleware.Timeout(50 * time.Millisecond))
r.Get("/slow", func(w http.ResponseWriter, req *http.Request) {
    select {
    case <-req.Context().Done():
        return
    case <-workFinished:
        fmt.Fprint(w, "finished")
    }
})
```

The example follows the upstream middleware's documented pattern. In real code, pass the request context through to context-aware database or HTTP calls. Once a successful response has already been written, the middleware cannot replace it with a fresh status code.

The guide's timeout test blocks only on `req.Context().Done()`, observes `context.DeadlineExceeded`, and returns without writing a response. The middleware then emits 504. It checks cancellation and the resulting response; it does not claim a wall-clock guarantee for an uncooperative handler.

The pinned implementation is [`middleware/timeout.go`](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/timeout.go#L32). Read `Timeout`, `Recoverer`, and `RequestID` in the Go API tab when composing a service's request stack. Recovery and request IDs address different parts of the request lifecycle; neither makes background work cancellable.
