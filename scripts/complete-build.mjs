// Preserve Sourcey's generated Go overview at the URL its Go adapter links to.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const site=path.join(root,'site');
fs.mkdirSync(path.join(site,'go-api'),{recursive:true});
fs.copyFileSync(path.join(site,'go-api.html'),path.join(site,'go-api/index.html'));
for(const name of ['LICENSE','LICENSE-CHI'])fs.copyFileSync(path.join(root,name),path.join(site,name+'.txt'));
