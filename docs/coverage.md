# Coverage and checks {#coverage-and-checks}


Sourcey 3.8.3 extracted **129 source-mapped public declarations** from two packages at the pinned chi commit. This includes **57 functions, 20 types and 45 methods**, plus constants and variables. Interface members and exported struct fields are rendered within their type declarations and are not inflated into separate coverage counts.

| Package | Functions | Types | Methods |
| --- | ---: | ---: | ---: |
| `github.com/go-chi/chi/v5` | 9 | 9 | 36 |
| `github.com/go-chi/chi/v5/middleware` | 48 | 11 | 9 |

The snapshot preserves package comments, signatures, type declarations and source positions. The [source map](https://nnyydct-ship-it.github.io/chi-field-guide/source-map.md) links all counted declarations to their original files. The machine-readable inventory is committed as `data/coverage.json`.


## Checked behavior {#checked-behavior}


The original Go examples check four path-and-method cases, implicit HEAD handling through a real local HTTP server, explicit HEAD precedence, the observable middleware entry/exit order, a late `Use` panic, and cooperative context cancellation with a 504 response. These are bounded examples of the three recipes, rather than a claim that this guide re-tests chi's entire implementation.

The site verifier checks generated HTML and local fragments, source-map commit pins, and that every counted declaration's anchor is present in the generated reference. See [reproduce](https://nnyydct-ship-it.github.io/chi-field-guide/reproduce.md) for the commands.


## Limits {#limits}


The public surface is a snapshot of one commit. It does not cover upstream example modules or private helpers, and it does not establish compatibility with future chi releases. The initial Sourcey snapshot contains no extracted upstream examples; the guide supplies and runs its own examples separately rather than calling that field covered. Browser appearance, source extraction, link checks and executed Go behavior are separate checks.

For current upstream changes, consult [go-chi/chi](https://github.com/go-chi/chi). This independent guide records its exact source revision.
