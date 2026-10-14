import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import handler from '../api/search.js';
function response(){return {headers:{},status:0,body:'',setHeader(k,v){this.headers[k]=v;},writeHead(status,headers={}){this.status=status;Object.assign(this.headers,headers);},end(body=''){this.body=body;}};}
test('Vercel exporteert een handler en verwerkt geparste JSON op HTTPS',async()=>{
 const res=response();
 await handler({url:'/api/search',method:'POST',headers:{host:'gifted.vercel.app',origin:'https://gifted.vercel.app'},body:{plans:[]}},res);
 assert.equal(res.status,400);assert.match(res.body,/interesses/);
});
test('andere origins worden geweigerd en statische pagina blijft bruikbaar',async()=>{
 const denied=response();await handler({url:'/api/search',method:'POST',headers:{host:'gifted.vercel.app',origin:'https://other.example'},body:{}},denied);assert.equal(denied.status,403);
 const page=response();await handler({url:'/',method:'GET',headers:{}},page);assert.equal(page.status,200);assert.match(page.body.toString(),/Gifted/);
 const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url)));assert.equal(config.buildCommand,'npm run build');assert.equal(typeof handler,'function');
});
