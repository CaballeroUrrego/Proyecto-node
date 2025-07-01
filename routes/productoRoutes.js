const { listarProductos, crearProducto } = require("../controllers/productoController");

function route(req, res) {
  if (req.method === "GET" && req.url === "/api/productos") {
    listarProductos(res);
  } else if (req.method === "POST" && req.url === "/api/productos") {
    crearProducto(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
}

module.exports = { route };