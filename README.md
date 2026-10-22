# Chi Field Guide

An independent, source-linked guide to `github.com/go-chi/chi/v5`. The Go API is generated from the actual upstream source by Sourcey's native godoc adapter. Original recipes demonstrate routing, middleware order and cooperative timeouts with runnable Go tests.

Live documentation: https://nnyydct-ship-it.github.io/chi-field-guide/

This is an EvidenceHarbor documentation project. It is not an official chi site and does not imply upstream endorsement. Use [go-chi.io](https://go-chi.io) and [pkg.go.dev](https://pkg.go.dev/github.com/go-chi/chi/v5) for the official project and reference.

Pinned source: [`go-chi/chi@9f8adb1aabaa8a91180a821111d3f8e668d1c0bf`](https://github.com/go-chi/chi/tree/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf), committed 2026-10-18. Source and generated API documentation retain the upstream MIT license in `LICENSE-CHI`.

## Build the committed snapshot

With Node 24:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm run verify
```

## Regenerate and exercise the actual source

With Go 1.27.3 and Git available:

```sh
node scripts/fetch-upstream.mjs
npm run snapshot
cd examples
go test -v ./...
```

The upstream checkout is pinned and excluded from this repository. The committed snapshot allows a JavaScript-only rebuild. No service account or API key is needed.
