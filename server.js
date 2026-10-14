import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import {searchInterests} from './search.js';
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/relevance.js', ['relevance.js', 'text/javascript; charset=utf-8']],
  ['/catalog.js', ['catalog.js', 'text/javascript; charset=utf-8']],
  ['/gift-scenes.png', ['gift-scenes.png', 'image/png']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']]
]);
export function createApp() {
  return http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    try {
      if (req.method === 'POST' && req.url === '/api/search') {
        if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}`) { res.writeHead(403); return res.end(); }
        let body='';
        for await (const chunk of req) { body+=chunk; if (Buffer.byteLength(body)>10000) { res.writeHead(413); return res.end(); } }
        let interests;
        try { interests=JSON.parse(body).products; } catch { res.writeHead(400); return res.end(JSON.stringify({error:'Ongeldig formulier.'})); }
        try {
          const result = await searchInterests(interests);
          res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'}); return res.end(JSON.stringify(result));
        } catch(error) { res.writeHead(400,{'Content-Type':'application/json; charset=utf-8'}); return res.end(JSON.stringify({error:error.message})); }
      }
      if (req.method === 'GET' && files.has(req.url)) {
        const [file, type] = files.get(req.url);
        const body = await readFile(new URL(`./public/${file}`, import.meta.url));
        res.writeHead(200, { 'Content-Type': type });
        return res.end(body);
      }
      res.writeHead(404, { 'Content-Type':'application/json; charset=utf-8' });
      res.end(JSON.stringify({error:'Deze pagina bestaat niet.'}));
    } catch {
      res.writeHead(500, { 'Content-Type':'application/json; charset=utf-8' });
      res.end(JSON.stringify({error:'Er ging iets mis. Probeer opnieuw.'}));
    }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3001);
  createApp().listen(port, '127.0.0.1', () => console.log(`Gifted: http://localhost:${port}`));
}



