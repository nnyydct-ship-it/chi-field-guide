# middleware

## RequestIDKey

```go
const RequestIDKey ctxKeyRequestID = 0
```

RequestIDKey is the key that holds the unique request ID in a request context.

## LogEntryCtxKey

```go
var (
	// LogEntryCtxKey is the context.Context key to store the request log entry.
	LogEntryCtxKey = &contextKey{"LogEntry"}

	// DefaultLogger is called by the Logger middleware handler to log each request.
	// Its made a package-level variable so that it can be reconfigured for custom
	// logging configurations.
	DefaultLogger func(next http.Handler) http.Handler
)
```

## DefaultLogger

```go
var (
	// LogEntryCtxKey is the context.Context key to store the request log entry.
	LogEntryCtxKey = &contextKey{"LogEntry"}

	// DefaultLogger is called by the Logger middleware handler to log each request.
	// Its made a package-level variable so that it can be reconfigured for custom
	// logging configurations.
	DefaultLogger func(next http.Handler) http.Handler
)
```

## IsTTY

```go
var IsTTY bool
```

## RequestIDHeader

```go
var RequestIDHeader = "X-Request-Id"
```

RequestIDHeader is the name of the HTTP Header which contains the request id. Exported so that it can be changed by developers

## URLFormatCtxKey

```go
var (
	// URLFormatCtxKey is the context.Context key to store the URL format data
	// for a request.
	URLFormatCtxKey = &contextKey{"URLFormat"}
)
```

## AllowContentEncoding

```go
func AllowContentEncoding(contentEncoding ...string) func(next http.Handler) http.Handler
```

AllowContentEncoding enforces a whitelist of request Content-Encoding otherwise responds with a 415 Unsupported Media Type status.

## AllowContentType

```go
func AllowContentType(contentTypes ...string) func(http.Handler) http.Handler
```

AllowContentType enforces a whitelist of request Content-Types otherwise responds with a 415 Unsupported Media Type status.

## BasicAuth

```go
func BasicAuth(realm string, creds map[string]string) func(next http.Handler) http.Handler
```

BasicAuth implements a simple middleware handler for adding basic http auth to a route.

## CleanPath

```go
func CleanPath(next http.Handler) http.Handler
```

CleanPath middleware will clean out double slash mistakes from a user's request path. For example, if a user requests /users//1 or //users////1 will both be treated as: /users/1

## ClientIPFromHeader

```go
func ClientIPFromHeader(trustedHeader string, trustedIPPrefixes ...string) func(http.Handler) http.Handler
```

ClientIPFromHeader stores the client IP from a single-IP header set by your reverse proxy. Read it with [GetClientIP](#func-GetClientIP).

Only safe with headers your proxy unconditionally OVERWRITES on every request, e.g.:

  - X-Real-IP        — Nginx with ngx\_http\_realip\_module
  - X-Client-IP      — Apache with mod\_remoteip
  - CF-Connecting-IP — Cloudflare

True-Client-IP, X-Azure-ClientIP, and Fastly-Client-IP look similar but pass through from the client by default in those products; don't use them unless your edge strips the inbound value.

If the header reaches us with multiple values (misconfigured proxy that appends, or a downstream proxy not stripping a client-supplied value), the LAST value wins — that's the one set by the hop closest to us, and therefore the most trusted. Fail-closed if the last value doesn't parse: no client IP is set rather than falling back to earlier (less-trusted) values.

v4-mapped IPv6 (::ffff:a.b.c.d) folds to plain v4 and IPv6 zones are stripped before storage.

Overwriting only protects requests that pass through your proxy. A client that reaches this server directly can set the header to anything. Pass your proxy's CIDR prefixes as trustedIPPrefixes to close that gap: the header is then read only when r.RemoteAddr falls within one of them; otherwise r.RemoteAddr itself is the client IP. This mirrors nginx (set\_real\_ip\_from), Apache (RemoteIPTrustedProxy), and Caddy (trusted\_proxies), and Cloudflare's advice to accept origin traffic only from its IP ranges. Without trustedIPPrefixes, guarantee at the network layer (security group / firewall) that only your proxy can reach this server.

	r.Use(middleware.ClientIPFromHeader("CF-Connecting-IP",
	    "173.245.48.0/20", // Cloudflare IPv4, see https://www.cloudflare.com/ips/
	    "2400:cb00::/32",  // Cloudflare IPv6
	))

Panics at startup if any prefix is invalid.

## ClientIPFromRemoteAddr

```go
func ClientIPFromRemoteAddr(h http.Handler) http.Handler
```

ClientIPFromRemoteAddr stores the client IP read from the TCP RemoteAddr of the incoming request — the IP address of whoever opened the connection to this server. Read it with [GetClientIP](#func-GetClientIP).

Use this when this server is directly connected to the public internet with NO reverse proxy in front of it. Behind a reverse proxy, RemoteAddr is the proxy's IP, not the client's — use [ClientIPFromHeader](#func-ClientIPFromHeader) or [ClientIPFromXFF](#func-ClientIPFromXFF) instead.

IPv4 clients on a dual-stack listener surface as ::ffff:a.b.c.d; they fold to plain v4 before storage so one logical client maps to one key. IPv6 zones are preserved (link-local connections may legitimately have one).

## ClientIPFromXFF

```go
func ClientIPFromXFF(trustedIPPrefixes ...string) func(http.Handler) http.Handler
```

ClientIPFromXFF stores the client IP read from the X-Forwarded-For header, walking the chain right-to-left and skipping any IP that falls within one of the given trusted CIDR prefixes. The first IP that is not trusted is the client. Read it with [GetClientIP](#func-GetClientIP).

An unparseable entry mid-chain aborts the walk and leaves no client IP set (fail-closed) — we can't safely trust anything left of garbage.

Use this when you sit behind one or more reverse proxies whose IP ranges you can enumerate as CIDRs. Most CDNs publish their IPs:

	Cloudflare:   https://www.cloudflare.com/ips/
	AWS:          https://ip-ranges.amazonaws.com/ip-ranges.json
	Fastly:       https://api.fastly.com/public-ip-list
	Google Cloud: https://www.gstatic.com/ipranges/cloud.json

Example (CloudFront):

	r.Use(middleware.ClientIPFromXFF(
	    "13.32.0.0/15",   // CloudFront IPv4
	    "52.46.0.0/18",   // CloudFront IPv4
	    "2600:9000::/28", // CloudFront IPv6
	))

The TCP peer in r.RemoteAddr is treated as the rightmost hop: if it is not within a trusted prefix, it is the client IP and X-Forwarded-For is ignored. A client reaching this server directly therefore cannot spoof its IP. If r.RemoteAddr doesn't parse, no client IP is set (fail-closed).

At least one prefix is required. For a single trusted hop directly in front of this server (e.g., nginx on localhost), pass its address:

	r.Use(middleware.ClientIPFromXFF("127.0.0.1/32", "::1/128"))

v4-mapped IPv6 (::ffff:a.b.c.d) folds to plain v4 and IPv6 zones are stripped before the prefix check and storage; otherwise an attacker could use either notation to alias a trusted IP past the check.

If you know the number of trusted proxies but not their IPs, use [ClientIPFromXFFTrustedProxies](#func-ClientIPFromXFFTrustedProxies) instead.

Panics at startup if no prefix is given or any prefix is invalid.

## ClientIPFromXFFTrustedProxies

```go
func ClientIPFromXFFTrustedProxies(numTrustedProxies int) func(http.Handler) http.Handler
```

ClientIPFromXFFTrustedProxies stores the client IP read from X-Forwarded-For, given the exact number of trusted reverse proxies between this server and the public internet. Read it with [GetClientIP](#func-GetClientIP).

PREFER [ClientIPFromXFF](#func-ClientIPFromXFF) with explicit CIDRs whenever you can — it cannot off-by-one and is robust to architecture changes. Most CDNs publish their IP ranges (Cloudflare, AWS, Fastly, Google Cloud). Use this counting variant only when proxy IPs are dynamic and unpublishable.

numTrustedProxies = total proxy hops between the client and this server. Count every hop in the request path:

	Single proxy (one LB / nginx / Heroku / Fly.io / Render) ....... 1
	Two proxies  (Cloudflare → ALB, CloudFront → ALB) .............. 2
	Three proxies (CDN → API gateway → LB) ......................... 3

VERIFY BEFORE GOING LIVE: send a request from a known IP and confirm [GetClientIP](#func-GetClientIP) returns that IP. If it returns a proxy IP, your count is too LOW — a client can spoof their IP, fix immediately. If it returns "", your count is too HIGH — no leak, but no client IP either.

This middleware reads ONLY X-Forwarded-For; it does not inspect r.RemoteAddr. Guarantee at the network layer (security group / firewall) that only your proxies can reach this server.

If the XFF chain has fewer than numTrustedProxies entries, no client IP is set (fail-closed). Like [ClientIPFromXFF](#func-ClientIPFromXFF), v4-mapped IPv6 folds to v4 and IPv6 zones are stripped before storage.

Panics at startup if numTrustedProxies \< 1.

## Compress

```go
func Compress(level int, types ...string) func(next http.Handler) http.Handler
```

Compress is a middleware that compresses response body of a given content types to a data format based on Accept-Encoding request header. It uses a given compression level.

NOTE: make sure to set the Content-Type header on your response otherwise this middleware will not compress the response body. For ex, in your handler you should set w.Header().Set("Content-Type", http.DetectContentType(yourBody)) or set it manually.

Passing a compression level of 5 is sensible value

## ContentCharset

```go
func ContentCharset(charsets ...string) func(next http.Handler) http.Handler
```

ContentCharset generates a handler that writes a 415 Unsupported Media Type response if none of the charsets match. An empty charset will allow requests with no Content-Type header or no specified charset. Requests without a body (ContentLength == 0) are always allowed. Quoted charset values, such as charset="UTF-8", are accepted.

## Deprecation

```go
func Deprecation(deprecatedAt time.Time, links ...string) func(http.Handler) http.Handler
```

Deprecation marks a route as deprecated, per RFC 9745. [https://www.rfc-editor.org/rfc/rfc9745.html](https://www.rfc-editor.org/rfc/rfc9745.html)

Use it from the day you decide to retire a route. The route keeps working, and clients are told to migrate. When you know the removal date, add [Sunset](#func-Sunset). Middleware order doesn't matter.

deprecatedAt is when the route was, or will be, deprecated. A past date is fine. It panics if deprecatedAt is the zero time, which is usually an unset value. Pass a real date, or skip the middleware when no date is set.

Each link is added as-is as a Link header, so it must be a full RFC 8288 value, e.g. `<[https://example.com/migrate](https://example.com/migrate)>; rel="deprecation"`.

## GetClientIP

```go
func GetClientIP(ctx context.Context) string
```

GetClientIP returns the client IP as a string, as set by one of the ClientIPFrom\* middlewares. Returns "" if no valid IP was set. Convenient for logging, rate-limit keys, etc.

## GetClientIPAddr

```go
func GetClientIPAddr(ctx context.Context) netip.Addr
```

GetClientIPAddr returns the client IP as a [netip.Addr](https://pkg.go.dev/net/netip#Addr), as set by one of the ClientIPFrom\* middlewares. The returned Addr is the zero value if not set; use [netip.Addr.IsValid](https://pkg.go.dev/net/netip#Addr.IsValid) to check. Useful when you need typed work — prefix containment, Is4/Is6, etc. — without re-parsing the string.

## GetHead

```go
func GetHead(next http.Handler) http.Handler
```

GetHead automatically route undefined HEAD requests to GET handlers.

## GetLogEntry

```go
func GetLogEntry(r *http.Request) LogEntry
```

GetLogEntry returns the in-context LogEntry for a request.

## GetReqID

```go
func GetReqID(ctx context.Context) string
```

GetReqID returns a request ID from the given context if one is present. Returns the empty string if a request ID cannot be found.

## Heartbeat

```go
func Heartbeat(endpoint string) func(http.Handler) http.Handler
```

Heartbeat endpoint middleware useful to setting up a path like `/ping` that load balancers or uptime testing external services can make a request before hitting any routes. It's also convenient to place this above ACL middlewares as well.

## Logger

```go
func Logger(next http.Handler) http.Handler
```

Logger is a middleware that logs the start and end of each request, along with some useful data about what was requested, what the response status was, and how long it took to return. When standard output is a TTY, Logger will print in color, otherwise it will print in black and white. Logger prints a request ID if one is provided.

Alternatively, look at [https://github.com/goware/httplog](https://github.com/goware/httplog) for a more in-depth http logger with structured logging support.

IMPORTANT NOTE: Logger should go before any other middleware that may change the response, such as middleware.Recoverer. Example:

	r := chi.NewRouter()
	r.Use(middleware.Logger)        // <--<< Logger should come before Recoverer
	r.Use(middleware.Recoverer)
	r.Get("/", handler)

## Maybe

```go
func Maybe(mw func(http.Handler) http.Handler, maybeFn func(r *http.Request) bool) func(http.Handler) http.Handler
```

Maybe middleware will allow you to change the flow of the middleware stack execution depending on return value of maybeFn(request). This is useful for example if you'd like to skip a middleware handler if a request does not satisfy the maybeFn logic.

## New

```go
func New(h http.Handler) func(next http.Handler) http.Handler
```

New will create a new middleware handler from a http.Handler.

## NewCompressor

```go
func NewCompressor(level int, types ...string) *Compressor
```

NewCompressor creates a new Compressor that will handle encoding responses.

The level should be one of the ones defined in the flate package. The types are the content types that are allowed to be compressed.

Catch-all wildcards ("\*/\*", "/\*") are rejected: compressing every response wastes CPU on already-compressed types like zip, jpeg or png. Pass explicit types instead, e.g. "text/html" or "application/\*".

## NewPattern

```go
func NewPattern(value string) Pattern
```

## NewWrapResponseWriter

```go
func NewWrapResponseWriter(w http.ResponseWriter, protoMajor int) WrapResponseWriter
```

NewWrapResponseWriter wraps an http.ResponseWriter, returning a proxy that allows you to hook into various parts of the response process.

## NextRequestID

```go
func NextRequestID() uint64
```

NextRequestID generates the next request ID in the sequence.

## NoCache

```go
func NoCache(h http.Handler) http.Handler
```

NoCache is a simple piece of middleware that sets a number of HTTP headers to prevent a router (or subrouter) from being cached by an upstream proxy and/or client.

As per [http://wiki.nginx.org/HttpProxyModule](http://wiki.nginx.org/HttpProxyModule) - NoCache sets:

	Expires: Thu, 01 Jan 1970 00:00:00 UTC
	Cache-Control: no-cache, private, max-age=0
	X-Accel-Expires: 0
	Pragma: no-cache (for HTTP/1.0 proxies/clients)

## PageRoute

```go
func PageRoute(path string, handler http.Handler) func(http.Handler) http.Handler
```

PageRoute is a simple middleware which allows you to route a static GET request at the middleware stack level.

## PathRewrite

```go
func PathRewrite(old, new string) func(http.Handler) http.Handler
```

PathRewrite is a simple middleware which allows you to rewrite the request URL path.

## PrintPrettyStack

```go
func PrintPrettyStack(rvr any)
```

## Profiler

```go
func Profiler() http.Handler
```

Profiler is a convenient subrouter used for mounting net/http/pprof. ie.

	func MyService() http.Handler {
		r := chi.NewRouter()
		// ..middlewares
		r.Mount("/debug", middleware.Profiler())
		// ..routes
		return r
	}

## RealIP

```go
func RealIP(h http.Handler) http.Handler
```

RealIP is a middleware that sets a http.Request's RemoteAddr to the results of parsing either the True-Client-IP, X-Real-IP or the X-Forwarded-For headers (in that order).

Deprecated: RealIP is vulnerable to IP spoofing — it mutates r.RemoteAddr to the leftmost X-Forwarded-For value, or to True-Client-IP / X-Real-IP whether or not your infrastructure actually sets them. See GHSA-3fxj-6jh8-hvhx, GHSA-rjr7-jggh-pgcp, GHSA-9g5q-2w5x-hmxf.

Use [ClientIPFromHeader](#func-ClientIPFromHeader), [ClientIPFromXFF](#func-ClientIPFromXFF), [ClientIPFromXFFTrustedProxies](#func-ClientIPFromXFFTrustedProxies) or [ClientIPFromRemoteAddr](#func-ClientIPFromRemoteAddr) and read the IP with [GetClientIP](#func-GetClientIP) instead. These never mutate r.RemoteAddr.

## Recoverer

```go
func Recoverer(next http.Handler) http.Handler
```

Recoverer is a middleware that recovers from panics, logs the panic (and a backtrace), and returns a HTTP 500 (Internal Server Error) status if possible. Recoverer prints a request ID if one is provided.

Alternatively, look at [https://github.com/go-chi/httplog](https://github.com/go-chi/httplog) middleware pkgs.

## RedirectSlashes

```go
func RedirectSlashes(next http.Handler) http.Handler
```

RedirectSlashes is a middleware that will match request paths with a trailing slash and redirect to the same path, less the trailing slash.

NOTE: RedirectSlashes middleware is \*incompatible\* with http.FileServer, see [https://github.com/go-chi/chi/issues/343](https://github.com/go-chi/chi/issues/343)

## RequestID

```go
func RequestID(next http.Handler) http.Handler
```

RequestID is a middleware that injects a request ID into the context of each request. A request ID is a string of the form "host.example.com/random-0001", where "random" is a base62 random string that uniquely identifies this go process, and where the last number is an atomically incremented request counter.

## RequestLogger

```go
func RequestLogger(f LogFormatter) func(next http.Handler) http.Handler
```

RequestLogger returns a logger handler using a custom LogFormatter.

## RequestSize

```go
func RequestSize(bytes int64) func(http.Handler) http.Handler
```

RequestSize is a middleware that will limit request sizes to a specified number of bytes. It uses MaxBytesReader to do so.

## RouteHeaders

```go
func RouteHeaders() HeaderRouter
```

RouteHeaders is a neat little header-based router that allows you to direct the flow of a request through a middleware stack based on a request header.

For example, lets say you'd like to setup multiple routers depending on the request Host header, you could then do something as so:

	r := chi.NewRouter()
	rSubdomain := chi.NewRouter()
	r.Use(middleware.RouteHeaders().
		Route("Host", "example.com", middleware.New(r)).
		Route("Host", "*.example.com", middleware.New(rSubdomain)).
		Handler)
	r.Get("/", h)
	rSubdomain.Get("/", h2)

Another example, imagine you want to setup multiple CORS handlers, where for your origin servers you allow authorized requests, but for third-party public requests, authorization is disabled.

	r := chi.NewRouter()
	r.Use(middleware.RouteHeaders().
		Route("Origin", "https://app.skyweaver.net", cors.Handler(cors.Options{
			AllowedOrigins:   []string{"https://api.skyweaver.net"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
			AllowCredentials: true, // <----------<<< allow credentials
		})).
		Route("Origin", "*", cors.Handler(cors.Options{
			AllowedOrigins:   []string{"*"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Content-Type"},
			AllowCredentials: false, // <----------<<< do not allow credentials
		})).
		Handler)

## SetHeader

```go
func SetHeader(key, value string) func(http.Handler) http.Handler
```

SetHeader is a convenience handler to set a response header key/value

## StripPrefix

```go
func StripPrefix(prefix string) func(http.Handler) http.Handler
```

StripPrefix is a middleware that will strip the provided prefix from the request path before handing the request over to the next handler.

## StripSlashes

```go
func StripSlashes(next http.Handler) http.Handler
```

StripSlashes is a middleware that will match request paths with a trailing slash, strip it from the path and continue routing through the mux, if a route matches, then it will serve the handler.

## Sunset

```go
func Sunset(sunsetAt time.Time, links ...string) func(http.Handler) http.Handler
```

Sunset announces when a route will stop working, per RFC 8594. [https://www.rfc-editor.org/rfc/rfc8594.html](https://www.rfc-editor.org/rfc/rfc8594.html)

Use it once you know the removal date, and keep [Deprecation](#func-Deprecation) on the same route. Sunset alone is valid, but clients get no "stop using this" signal. Middleware order doesn't matter.

sunsetAt is usually a future date, and should not be before the deprecation date. After it, remove the route or return 410 Gone. It panics if sunsetAt is the zero time, which is usually an unset value. Pass a real date, or skip the middleware when no date is set.

Each link is added as-is as a Link header, so it must be a full RFC 8288 value, e.g. `<[https://example.com/migrate](https://example.com/migrate)>; rel="sunset"`.

## SupressNotFound

```go
func SupressNotFound(router *chi.Mux) func(next http.Handler) http.Handler
```

SupressNotFound will quickly respond with a 404 if the route is not found and will not continue to the next middleware handler.

This is handy to put at the top of your middleware stack to avoid unnecessary processing of requests that are not going to match any routes anyway. For example its super annoying to see a bunch of 404's in your logs from bots.

## Throttle

```go
func Throttle(limit int) func(http.Handler) http.Handler
```

Throttle is a middleware that limits number of currently processed requests at a time across all users. Note: Throttle is not a rate-limiter per user, instead it just puts a ceiling on the number of current in-flight requests being processed from the point from where the Throttle middleware is mounted.

## ThrottleBacklog

```go
func ThrottleBacklog(limit, backlogLimit int, backlogTimeout time.Duration) func(http.Handler) http.Handler
```

ThrottleBacklog is a middleware that limits number of currently processed requests at a time and provides a backlog for holding a finite number of pending requests.

## ThrottleWithOpts

```go
func ThrottleWithOpts(opts ThrottleOpts) func(http.Handler) http.Handler
```

ThrottleWithOpts is a middleware that limits number of currently processed requests using passed ThrottleOpts.

## Timeout

```go
func Timeout(timeout time.Duration) func(next http.Handler) http.Handler
```

Timeout is a middleware that cancels ctx after a given timeout and return a 504 Gateway Timeout error to the client.

It's required that you select the ctx.Done() channel to check for the signal if the context has reached its deadline and return, otherwise the timeout signal will be just ignored.

ie. a route/handler may look like:

	r.Get("/long", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		processTime := time.Duration(rand.Intn(4)+1) * time.Second

		select {
		case <-ctx.Done():
			return

		case <-time.After(processTime):
			// The above channel simulates some hard work.
		}

		w.Write([]byte("done"))
	})

## URLFormat

```go
func URLFormat(next http.Handler) http.Handler
```

URLFormat is a middleware that parses the url extension from a request path and stores it on the context as a string under the key `middleware.URLFormatCtxKey`. The middleware will trim the suffix from the routing path and continue routing.

Routers should not include a url parameter for the suffix when using this middleware.

Sample usage for url paths `/articles/1`, `/articles/1.json` and `/articles/1.xml`:

	func routes() http.Handler {
		r := chi.NewRouter()
		r.Use(middleware.URLFormat)

		r.Get("/articles/{id}", ListArticles)

		return r
	}

	func ListArticles(w http.ResponseWriter, r *http.Request) {
		urlFormat, _ := r.Context().Value(middleware.URLFormatCtxKey).(string)

		switch urlFormat {
		case "json":
			render.JSON(w, r, articles)
		case "xml:"
			render.XML(w, r, articles)
		default:
			render.JSON(w, r, articles)
		}
	}

## WithLogEntry

```go
func WithLogEntry(r *http.Request, entry LogEntry) *http.Request
```

WithLogEntry sets the in-context LogEntry for a request.

## WithValue

```go
func WithValue(key, val any) func(next http.Handler) http.Handler
```

WithValue is a middleware that sets a given key/value in a context chain.

## Compressor

```go
type Compressor struct {
	// contains filtered or unexported fields
}
```

Compressor represents a set of encoding configurations.

## Handler

```go
func (c *Compressor) Handler(next http.Handler) http.Handler
```

Handler returns a new middleware that will compress the response based on the current Compressor.

## SetEncoder

```go
func (c *Compressor) SetEncoder(encoding string, fn EncoderFunc)
```

SetEncoder can be used to set the implementation of a compression algorithm.

The encoding should be a standardised identifier. See: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding)

For example, add the Brotli algorithm:

	import "github.com/google/brotli/go/cbrotli"

	compressor := middleware.NewCompressor(5, "text/html")
	compressor.SetEncoder("br", func(w io.Writer, level int) io.Writer {
		return cbrotli.NewWriter(w, cbrotli.WriterOptions{Quality: level})
	})

Alternatively, this Cgo-free Brotli module can be used:

	import "github.com/andybalholm/brotli"

	compressor := middleware.NewCompressor(5, "text/html")

	compressor.SetEncoder("br", func(w io.Writer, level int) io.Writer {
		return brotli.NewWriterV2(w, level)
	})

## DefaultLogFormatter

```go
type DefaultLogFormatter struct {
	Logger  LoggerInterface
	NoColor bool
}
```

DefaultLogFormatter is a simple logger that implements a LogFormatter.

- `Logger: LoggerInterface`: 
- `NoColor: bool`: 

## NewLogEntry

```go
func (l *DefaultLogFormatter) NewLogEntry(r *http.Request) LogEntry
```

NewLogEntry creates a new LogEntry for the request.

## EncoderFunc

```go
type EncoderFunc func(w io.Writer, level int) io.Writer
```

An EncoderFunc is a function that wraps the provided io.Writer with a streaming compression algorithm and returns it.

In case of failure, the function should return nil.

## HeaderRoute

```go
type HeaderRoute struct {
	Middleware func(next http.Handler) http.Handler
	MatchOne   Pattern
	MatchAny   []Pattern
}
```

- `Middleware: func(next http.Handler) http.Handler`: 
- `MatchOne: Pattern`: 
- `MatchAny: []Pattern`: 

## IsMatch

```go
func (r HeaderRoute) IsMatch(value string) bool
```

## HeaderRouter

```go
type HeaderRouter map[string][]HeaderRoute
```

## Handler

```go
func (hr HeaderRouter) Handler(next http.Handler) http.Handler
```

## Route

```go
func (hr HeaderRouter) Route(header, match string, middlewareHandler func(next http.Handler) http.Handler) HeaderRouter
```

## RouteAny

```go
func (hr HeaderRouter) RouteAny(header string, match []string, middlewareHandler func(next http.Handler) http.Handler) HeaderRouter
```

## RouteDefault

```go
func (hr HeaderRouter) RouteDefault(handler func(next http.Handler) http.Handler) HeaderRouter
```

## LogEntry

```go
type LogEntry interface {
	Write(status, bytes int, header http.Header, elapsed time.Duration, extra any)
	Panic(v any, stack []byte)
}
```

LogEntry records the final log when a request completes. See defaultLogEntry for an example implementation.

- `Write: func(status, bytes int, header http.Header, elapsed time.Duration, extra any)`: 
- `Panic: func(v any, stack []byte)`: 

## LogFormatter

```go
type LogFormatter interface {
	NewLogEntry(r *http.Request) LogEntry
}
```

LogFormatter initiates the beginning of a new LogEntry per request. See DefaultLogFormatter for an example implementation.

- `NewLogEntry: func(r *http.Request) LogEntry`: 

## LoggerInterface

```go
type LoggerInterface interface {
	Print(v ...any)
}
```

LoggerInterface accepts printing to stdlib logger or compatible logger.

- `Print: func(v ...any)`: 

## Pattern

```go
type Pattern struct {
	// contains filtered or unexported fields
}
```

## Match

```go
func (p Pattern) Match(v string) bool
```

## ThrottleOpts

```go
type ThrottleOpts struct {
	// RetryAfterFn, if set, enables the Retry-After header on rejected requests.
	// The result is rounded up to whole seconds and clamped at 0, because the
	// header carries a non-negative integer (RFC 9110 section 10.2.3).
	RetryAfterFn   func(ctxDone bool) time.Duration
	Limit          int
	BacklogLimit   int
	BacklogTimeout time.Duration
	StatusCode     int
}
```

ThrottleOpts represents a set of throttling options.

- `RetryAfterFn: func(ctxDone bool) time.Duration`: RetryAfterFn, if set, enables the Retry-After header on rejected requests. The result is rounded up to whole seconds and clamped at 0, because the header carries a non-negative integer (RFC 9110 section 10.2.3).
- `Limit: int`: 
- `BacklogLimit: int`: 
- `BacklogTimeout: time.Duration`: 
- `StatusCode: int`: 

## WrapResponseWriter

```go
type WrapResponseWriter interface {
	http.ResponseWriter
	// Status returns the HTTP status of the request, or 0 if one has not
	// yet been sent.
	Status() int
	// BytesWritten returns the total number of bytes sent to the client.
	BytesWritten() int
	// Tee causes the response body to be written to the given io.Writer in
	// addition to proxying the writes through. Only one io.Writer can be
	// tee'd to at once: setting a second one will overwrite the first.
	// Writes will be sent to the proxy before being written to this
	// io.Writer. It is illegal for the tee'd writer to be modified
	// concurrently with writes.
	Tee(io.Writer)
	// Unwrap returns the original proxied target.
	Unwrap() http.ResponseWriter
	// Discard causes all writes to the original ResponseWriter be discarded,
	// instead writing only to the tee'd writer if it's set.
	// Flush calls also do not reach the original ResponseWriter.
	// The caller is responsible for calling WriteHeader and Write on the
	// original ResponseWriter once the processing is done.
	Discard()
}
```

WrapResponseWriter is a proxy around an http.ResponseWriter that allows you to hook into various parts of the response process.

- `http.ResponseWriter: http.ResponseWriter`: 
- `Status: func() int`: Status returns the HTTP status of the request, or 0 if one has not yet been sent.
- `BytesWritten: func() int`: BytesWritten returns the total number of bytes sent to the client.
- `Tee: func(io.Writer)`: Tee causes the response body to be written to the given io.Writer in addition to proxying the writes through. Only one io.Writer can be tee'd to at once: setting a second one will overwrite the first. Writes will be sent to the proxy before being written to this io.Writer. It is illegal for the tee'd writer to be modified concurrently with writes.
- `Unwrap: func() http.ResponseWriter`: Unwrap returns the original proxied target.
- `Discard: func()`: Discard causes all writes to the original ResponseWriter be discarded, instead writing only to the tee'd writer if it's set. Flush calls also do not reach the original ResponseWriter. The caller is responsible for calling WriteHeader and Write on the original ResponseWriter once the processing is done.
