import { defineConfig, markdown, godoc } from 'sourcey';

export default defineConfig({
  name: 'Chi Field Guide',
  siteUrl: 'https://nnyydct-ship-it.github.io',
  baseUrl: '/chi-field-guide',
  notFound: false,
  theme: { name: 'default', colors: { primary: '#087E8B' } },
  repo: 'https://github.com/nnyydct-ship-it/chi-field-guide',
  prettyUrls: false,
  navigation: {
    tabs: [
      { tab: 'Field guide', slug: '', source: markdown({ groups: [
        { group: 'Start here', pages: ['introduction', 'quickstart'] },
        { group: 'Working recipes', pages: ['routing', 'middleware', 'timeouts'] },
        { group: 'Check the source', pages: ['source-map', 'coverage', 'reproduce', 'license'] },
      ] }) },
      { tab: 'Go API', slug: 'go-api', source: godoc({ snapshot: './data/godoc.json', mode: 'snapshot', includeTests: true }) },
    ],
  },
  navbar: { links: [
    { type: 'link', label: 'Upstream chi', href: 'https://go-chi.io' },
    { type: 'github', href: 'https://github.com/nnyydct-ship-it/chi-field-guide' },
  ] },
  footer: { text: 'Independent guide by EvidenceHarbor · chi source and API documentation: MIT, Peter Kieltyka and contributors.', links: [
    { type: 'link', label: 'Official Go reference', href: 'https://pkg.go.dev/github.com/go-chi/chi/v5' },
  ] },
});
