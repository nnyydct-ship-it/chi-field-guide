# Every declaration has a source {#every-declaration-has-a-source}


These 129 declarations were extracted by Sourcey's native Go introspector. Each link points to the same pinned upstream commit, `9f8adb1aabaa8a91180a821111d3f8e668d1c0bf`. The Go API tab contains their full declarations and package comments.


## github.com/go-chi/chi/v5 {#githubcomgo-chichiv5}


| Declaration | Kind | Pinned source |
| --- | --- | --- |
| `Chain` | function | [chain.go:6](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chain.go#L6) |
| `NewMux` | function | [mux.go:52](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L52) |
| `NewRouteContext` | function | [context.go:31](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L31) |
| `NewRouter` | function | [chi.go:62](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chi.go#L62) |
| `RegisterMethod` | function | [tree.go:70](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/tree.go#L70) |
| `RouteContext` | function | [context.go:25](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L25) |
| `URLParam` | function | [context.go:11](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L11) |
| `URLParamFromCtx` | function | [context.go:16](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L16) |
| `Walk` | function | [tree.go:882](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/tree.go#L882) |
| `ChainHandler` | type | [chain.go:24](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chain.go#L24) |
| `ChainHandler.ServeHTTP` | method | [chain.go:30](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chain.go#L30) |
| `Context` | type | [context.go:45](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L45) |
| `Context.Clone` | method | [context.go:104](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L104) |
| `Context.Reset` | method | [context.go:82](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L82) |
| `Context.RoutePattern` | method | [context.go:147](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L147) |
| `Context.URLParam` | method | [context.go:124](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L124) |
| `Middlewares` | type | [chi.go:140](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chi.go#L140) |
| `Middlewares.Handler` | method | [chain.go:12](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chain.go#L12) |
| `Middlewares.HandlerFunc` | method | [chain.go:18](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chain.go#L18) |
| `Mux` | type | [mux.go:21](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L21) |
| `Mux.Connect` | method | [mux.go:143](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L143) |
| `Mux.Delete` | method | [mux.go:149](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L149) |
| `Mux.Find` | method | [mux.go:382](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L382) |
| `Mux.Get` | method | [mux.go:155](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L155) |
| `Mux.Group` | method | [mux.go:268](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L268) |
| `Mux.Handle` | method | [mux.go:109](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L109) |
| `Mux.HandleFunc` | method | [mux.go:121](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L121) |
| `Mux.Head` | method | [mux.go:161](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L161) |
| `Mux.Match` | method | [mux.go:373](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L373) |
| `Mux.Method` | method | [mux.go:127](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L127) |
| `Mux.MethodFunc` | method | [mux.go:137](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L137) |
| `Mux.MethodNotAllowed` | method | [mux.go:223](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L223) |
| `Mux.MethodNotAllowedHandler` | method | [mux.go:421](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L421) |
| `Mux.Middlewares` | method | [mux.go:363](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L363) |
| `Mux.Mount` | method | [mux.go:295](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L295) |
| `Mux.NotFound` | method | [mux.go:203](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L203) |
| `Mux.NotFoundHandler` | method | [mux.go:412](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L412) |
| `Mux.Options` | method | [mux.go:167](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L167) |
| `Mux.Patch` | method | [mux.go:173](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L173) |
| `Mux.Post` | method | [mux.go:179](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L179) |
| `Mux.Put` | method | [mux.go:185](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L185) |
| `Mux.Query` | method | [mux.go:191](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L191) |
| `Mux.Route` | method | [mux.go:278](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L278) |
| `Mux.Routes` | method | [mux.go:358](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L358) |
| `Mux.ServeHTTP` | method | [mux.go:63](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L63) |
| `Mux.Trace` | method | [mux.go:197](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L197) |
| `Mux.Use` | method | [mux.go:100](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L100) |
| `Mux.With` | method | [mux.go:242](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/mux.go#L242) |
| `Route` | type | [tree.go:872](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/tree.go#L872) |
| `RouteParams` | type | [context.go:171](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L171) |
| `RouteParams.Add` | method | [context.go:176](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L176) |
| `Router` | type | [chi.go:68](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chi.go#L68) |
| `Routes` | type | [chi.go:121](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/chi.go#L121) |
| `WalkFunc` | type | [tree.go:879](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/tree.go#L879) |
| `RouteCtxKey` | variable | [context.go:37](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/context.go#L37) |


## github.com/go-chi/chi/v5/middleware {#githubcomgo-chichiv5middleware}


| Declaration | Kind | Pinned source |
| --- | --- | --- |
| `AllowContentEncoding` | function | [middleware/content_encoding.go:10](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/content_encoding.go#L10) |
| `AllowContentType` | function | [middleware/content_type.go:20](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/content_type.go#L20) |
| `BasicAuth` | function | [middleware/basic_auth.go:10](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/basic_auth.go#L10) |
| `CleanPath` | function | [middleware/clean_path.go:12](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/clean_path.go#L12) |
| `ClientIPFromHeader` | function | [middleware/client_ip.go:60](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L60) |
| `ClientIPFromRemoteAddr` | function | [middleware/client_ip.go:220](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L220) |
| `ClientIPFromXFF` | function | [middleware/client_ip.go:121](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L121) |
| `ClientIPFromXFFTrustedProxies` | function | [middleware/client_ip.go:182](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L182) |
| `Compress` | function | [middleware/compress.go:45](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L45) |
| `ContentCharset` | function | [middleware/content_charset.go:14](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/content_charset.go#L14) |
| `Deprecation` | function | [middleware/deprecation.go:22](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/deprecation.go#L22) |
| `GetClientIP` | function | [middleware/client_ip.go:232](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L232) |
| `GetClientIPAddr` | function | [middleware/client_ip.go:244](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/client_ip.go#L244) |
| `GetHead` | function | [middleware/get_head.go:10](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/get_head.go#L10) |
| `GetLogEntry` | function | [middleware/logger.go:75](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L75) |
| `GetReqID` | function | [middleware/request_id.go:83](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_id.go#L83) |
| `Heartbeat` | function | [middleware/heartbeat.go:12](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/heartbeat.go#L12) |
| `Logger` | function | [middleware/logger.go:39](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L39) |
| `Maybe` | function | [middleware/maybe.go:8](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/maybe.go#L8) |
| `New` | function | [middleware/middleware.go:6](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/middleware.go#L6) |
| `NewCompressor` | function | [middleware/compress.go:72](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L72) |
| `NewPattern` | function | [middleware/route_headers.go:135](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L135) |
| `NewWrapResponseWriter` | function | [middleware/wrap_writer.go:15](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/wrap_writer.go#L15) |
| `NextRequestID` | function | [middleware/request_id.go:94](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_id.go#L94) |
| `NoCache` | function | [middleware/nocache.go:40](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/nocache.go#L40) |
| `PageRoute` | function | [middleware/page_route.go:10](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/page_route.go#L10) |
| `PathRewrite` | function | [middleware/path_rewrite.go:9](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/path_rewrite.go#L9) |
| `PrintPrettyStack` | function | [middleware/recoverer.go:54](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/recoverer.go#L54) |
| `Profiler` | function | [middleware/profiler.go:22](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/profiler.go#L22) |
| `RealIP` | function | [middleware/realip.go:28](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/realip.go#L28) |
| `Recoverer` | function | [middleware/recoverer.go:22](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/recoverer.go#L22) |
| `RedirectSlashes` | function | [middleware/strip.go:41](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/strip.go#L41) |
| `RequestID` | function | [middleware/request_id.go:67](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_id.go#L67) |
| `RequestLogger` | function | [middleware/logger.go:44](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L44) |
| `RequestSize` | function | [middleware/request_size.go:9](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_size.go#L9) |
| `RouteHeaders` | function | [middleware/route_headers.go:42](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L42) |
| `SetHeader` | function | [middleware/content_type.go:9](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/content_type.go#L9) |
| `StripPrefix` | function | [middleware/strip.go:73](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/strip.go#L73) |
| `StripSlashes` | function | [middleware/strip.go:14](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/strip.go#L14) |
| `Sunset` | function | [middleware/sunset.go:22](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/sunset.go#L22) |
| `SupressNotFound` | function | [middleware/supress_notfound.go:15](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/supress_notfound.go#L15) |
| `Throttle` | function | [middleware/throttle.go:35](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/throttle.go#L35) |
| `ThrottleBacklog` | function | [middleware/throttle.go:42](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/throttle.go#L42) |
| `ThrottleWithOpts` | function | [middleware/throttle.go:47](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/throttle.go#L47) |
| `Timeout` | function | [middleware/timeout.go:32](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/timeout.go#L32) |
| `URLFormat` | function | [middleware/url_format.go:46](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/url_format.go#L46) |
| `WithLogEntry` | function | [middleware/logger.go:81](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L81) |
| `WithValue` | function | [middleware/value.go:9](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/value.go#L9) |
| `Compressor` | type | [middleware/compress.go:51](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L51) |
| `Compressor.Handler` | method | [middleware/compress.go:207](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L207) |
| `Compressor.SetEncoder` | method | [middleware/compress.go:167](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L167) |
| `DefaultLogFormatter` | type | [middleware/logger.go:92](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L92) |
| `DefaultLogFormatter.NewLogEntry` | method | [middleware/logger.go:98](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L98) |
| `EncoderFunc` | type | [middleware/compress.go:273](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/compress.go#L273) |
| `HeaderRoute` | type | [middleware/route_headers.go:110](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L110) |
| `HeaderRoute.IsMatch` | method | [middleware/route_headers.go:116](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L116) |
| `HeaderRouter` | type | [middleware/route_headers.go:46](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L46) |
| `HeaderRouter.Handler` | method | [middleware/route_headers.go:77](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L77) |
| `HeaderRouter.Route` | method | [middleware/route_headers.go:48](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L48) |
| `HeaderRouter.RouteAny` | method | [middleware/route_headers.go:58](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L58) |
| `HeaderRouter.RouteDefault` | method | [middleware/route_headers.go:72](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L72) |
| `LogEntry` | type | [middleware/logger.go:69](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L69) |
| `LogFormatter` | type | [middleware/logger.go:63](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L63) |
| `LoggerInterface` | type | [middleware/logger.go:87](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L87) |
| `Pattern` | type | [middleware/route_headers.go:129](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L129) |
| `Pattern.Match` | method | [middleware/route_headers.go:141](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/route_headers.go#L141) |
| `ThrottleOpts` | type | [middleware/throttle.go:20](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/throttle.go#L20) |
| `WrapResponseWriter` | type | [middleware/wrap_writer.go:48](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/wrap_writer.go#L48) |
| `RequestIDKey` | constant | [middleware/request_id.go:21](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_id.go#L21) |
| `LogEntryCtxKey` | variable | [middleware/logger.go:15](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L15) |
| `DefaultLogger` | variable | [middleware/logger.go:20](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/logger.go#L20) |
| `IsTTY` | variable | [middleware/terminal.go:35](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/terminal.go#L35) |
| `RequestIDHeader` | variable | [middleware/request_id.go:25](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/request_id.go#L25) |
| `URLFormatCtxKey` | variable | [middleware/url_format.go:14](https://github.com/go-chi/chi/blob/9f8adb1aabaa8a91180a821111d3f8e668d1c0bf/middleware/url_format.go#L14) |

Interface members and struct fields remain visible inside the generated type declarations. They are not counted again as standalone source-mapped declarations here.
