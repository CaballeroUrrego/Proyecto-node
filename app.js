const http = require('http');
const { route: productoRoute } = require('./routes/productoRoutes');
const { usuarioRoute } = require('./routes/usuarioRoutes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/usuarios')) {
    usuarioRoute(req, res);
  } else {
    productoRoute(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});