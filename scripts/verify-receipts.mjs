import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const key=JSON.parse(fs.readFileSync(path.join(root,'evidence/verification-key.json'),'utf8'));
const env={...process.env,RUNX_RECEIPT_VERIFY_ISSUER_TYPE:key.issuer_type,RUNX_RECEIPT_VERIFY_KID:key.kid,RUNX_RECEIPT_VERIFY_ED25519_PUBLIC_KEY_BASE64:key.public_key_base64};
execFileSync(path.join(root,'node_modules/.bin/runx'),['verify','sha256:bc112d40ffb1ab2a97f899386c8c9de961f5370b7a199b36a8b11727068767c2','--receipt-dir',path.join(root,'evidence/receipts'),'--trust','configured','--json'],{env,stdio:'inherit'});
