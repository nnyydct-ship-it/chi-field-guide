import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'site');
if(fs.existsSync(output)){
  if(fs.lstatSync(output).isSymbolicLink())throw Error('Generated output unexpectedly became a symlink');
  if(!fs.existsSync(path.join(output,'documents.json')))throw Error('Output has no Sourcey manifest; inspect before removing');
  fs.rmSync(output,{recursive:true});
}
