---
title: Put middleware at the scope it needs
description: Observe outer, group and inline middleware in one request, and avoid a late Use panic.
---

# Put middleware at the scope it needs

Install router-wide middleware with `Use` before registering any route. Chi builds the router's handler chain when routes are registered; calling `Use` on that same mux afterward panics. The checked example exercises that failure deliberately, so it cannot be mistaken for a silent no-op.

For a smaller scope, use `Group` or `With`:

```go
r := chi.NewRouter()
r.Use(outer)
r.Group(func(g chi.Router) {
    g.Use(groupOnly)
    g.With(endpointOnly).Get("/report", handler)
})
```

The example records entry and exit in middleware that wraps `next.ServeHTTP`. One request produces:

```text
outer-in
group-in
inline-in
handler
inline-out
group-out
outer-out
```

The last wrapper entered is the first one exited. Place work before `next.ServeHTTP` when it must happen before the handler, and after it when it needs the downstream result. The trace is produced by a runnable test against the pinned source.

`Group` supplies a fresh inline router with its own middleware stack. `With` adds middleware for the endpoint chain it returns. Neither requires replacing `net/http`'s handler interface.

Useful reference points include `Middlewares`, `Chain`, `ChainHandler`, `Mux.Use`, `Mux.With`, `Mux.Group`, and `middleware.RequestID`. Their exact signatures and comments are in the Go API tab, with pinned locations in the [source map](source-map.md).
