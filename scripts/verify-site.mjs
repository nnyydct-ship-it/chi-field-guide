import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {parseDocument} from 'htmlparser2';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const site=path.join(root,'site');
const origin='https://nnyydct-ship-it.github.io';
const prefix='/chi-field-guide/';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);
const files=walk(site);
const html=files.filter(x=>x.endsWith('.html'));
const pages=new Map();
for(const file of html){
  const ids=new Set(),links=[];
  const visit=node=>{const a=node.attribs??{};if(a.id)ids.add(a.id);for(const key of ['href','src'])if(a[key])links.push(a[key]);for(const child of node.children??[])visit(child);};
  visit(parseDocument(fs.readFileSync(file,'utf8')));
  pages.set(file,{ids,links});
}
const failures=[];let localLinks=0,fragmentLinks=0;
for(const [file,data] of pages){
  const rel=path.relative(site,file).split(path.sep).join('/');
  const base=new URL(prefix+rel,origin);
  for(const link of data.links){
    if(/^(data:|mailto:|tel:|javascript:)/i.test(link))continue;
    const url=new URL(link,base);
    if(url.origin!==origin)continue;
    if(!url.pathname.startsWith(prefix)){failures.push({page:rel,link,reason:'local URL lost the project prefix'});continue;}
    let target=path.resolve(site,decodeURIComponent(url.pathname.slice(prefix.length)));
    if(!target.startsWith(site+path.sep)&&target!==site)throw Error('Path escaped site');
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
    if(!fs.existsSync(target)){failures.push({page:rel,link,reason:'target file missing'});continue;}
    localLinks++;
    if(url.hash&&pages.has(target)){
      const id=decodeURIComponent(url.hash.slice(1));
      if(id&&!pages.get(target).ids.has(id))failures.push({page:rel,link,reason:'fragment missing'});
      fragmentLinks++;
    }
  }
}
const coverage=JSON.parse(fs.readFileSync(path.join(root,'data/coverage.json'),'utf8'));
assert(coverage.documented_declarations>=20);
for(const row of coverage.entries){
  const slug=row.package_relative==='root'?'package-root':'pkg-'+row.package_relative.replaceAll('/','-');
  const file=path.join(site,'go-api',slug+'.html');
  if(!pages.get(file)?.ids.has(row.anchor))failures.push({symbol:row.symbol,reason:'expected generated API anchor missing'});
  assert(row.source_url.includes('/blob/'+coverage.upstream_commit+'/'));
}
for(const file of ['index.html','introduction.html','routing.html','middleware.html','timeouts.html','source-map.html','coverage.html','go-api/package-root.html','go-api/pkg-middleware.html','llms.txt','llms-full.txt','sitemap.xml'])assert(fs.existsSync(path.join(site,file)),file);
const summary={passed:failures.length===0,generated_html_pages:html.length,local_links_checked:localLinks,fragment_links_checked:fragmentLinks,source_mapped_declarations:coverage.entries.length,upstream_commit:coverage.upstream_commit,failures};
console.log(JSON.stringify(summary,null,2));
assert.equal(failures.length,0,'Broken documentation target(s)');
