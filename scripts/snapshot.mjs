import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
execFileSync(process.execPath,[path.join(root,'scripts/fetch-upstream.mjs')],{stdio:'inherit'});
execFileSync(path.join(root,'node_modules/.bin/sourcey'),['godoc','--module',path.join(root,'.upstream/chi'),'--packages','./...','--includeTests','--out',path.join(root,'data/godoc.json')],{cwd:root,stdio:'inherit'});
