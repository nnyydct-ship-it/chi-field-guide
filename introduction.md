---
title: Chi Field Guide
description: Source-linked Go router reference, three working recipes, and a pinned reproducible build.
---

# Route a request. Check what actually happens.

Chi composes ordinary `net/http` handlers. The interesting decisions come when a path almost matches, a middleware applies to only part of a router, or a deadline expires while a handler is still working.

This guide puts those decisions beside the generated reference for **chi** and **chi/middleware**. Every exported declaration comes from a pinned upstream commit. The recipes have runnable Go tests; the source map links each extracted declaration back to its original file and line.

Start with [the quickstart](quickstart.md), then try [routing](routing.md), [middleware scope](middleware.md), or [timeouts](timeouts.md). Use the **Go API** tab for exact signatures and package comments. [Coverage](coverage.md) explains what was extracted and what was checked.

## The version you are reading

Upstream: [go-chi/chi](https://github.com/go-chi/chi), commit [`9f8adb1`](https://github.com/go-chi/chi/commit/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf), committed **18 October 2026**. The module requires Go 1.24 or newer; this guide's examples were checked with Go 1.27.3. The renderer is Sourcey 3.8.3.

This is an independent EvidenceHarbor project. The chi maintainers have not reviewed or endorsed it. The [official project](https://go-chi.io) and [official package reference](https://pkg.go.dev/github.com/go-chi/chi/v5) remain the primary homes for chi.

## Why keep another guide?

The generated reference preserves the API, while the recipes answer questions that cut across several symbols: what an implicit HEAD route does, where to put `Use`, and what a timeout can actually stop. The source map and pinned tests let a reader check those answers against one exact version.
