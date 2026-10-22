import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'.repro-native-output');
execFileSync(path.join(root,'node_modules/.bin/sourcey'),['build','-o',out],{cwd:root,stdio:'inherit'});
const html=fs.readFileSync(path.join(out,'go-api/package-root.html'),'utf8');
console.log(JSON.stringify({sourcey:'3.8.3',link_present:html.includes('/chi-field-guide/go-api/index.html'),linked_file_exists:fs.existsSync(path.join(out,'go-api/index.html')),emitted_overview_exists:fs.existsSync(path.join(out,'go-api.html'))},null,2));
