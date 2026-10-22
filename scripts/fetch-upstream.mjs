import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const checkout=path.join(root,'.upstream','chi');
const pin='9f8adb1aabaa8a91180a821111d3f8e668d1c0bf';
fs.mkdirSync(path.dirname(checkout),{recursive:true});
if(!fs.existsSync(checkout)){
  execFileSync('git',['clone','--filter=blob:none','--no-checkout','https://github.com/go-chi/chi.git',checkout],{stdio:'inherit'});
  execFileSync('git',['-C',checkout,'checkout','--detach',pin],{stdio:'inherit'});
}
const actual=execFileSync('git',['-C',checkout,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(actual!==pin)throw Error('Existing checkout differs from pinned commit; preserve and inspect it.');
console.log(JSON.stringify({repo:'https://github.com/go-chi/chi',commit:actual,verified:true}));
