'use strict';

// Servidor de arquivos estáticos: não existe API nem banco de dados neste MVP.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, 'www');
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch (_) {
    response.writeHead(400);
    return response.end('Requisição inválida');
  }

  const filePath = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    response.writeHead(403);
    return response.end('Acesso negado');
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      return response.end('Arquivo não encontrado');
    }
    response.writeHead(200, {
      'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    fs.createReadStream(filePath).pipe(response);
  });
}).listen(port, '0.0.0.0', () => {
  console.log('Portal do Aluno UCSal iniciado. Abra a porta ' + port + ' no navegador.');
});
