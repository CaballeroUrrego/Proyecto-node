const { listarProductos, crearProducto, actualizarProducto, eliminarProducto } = require("../controllers/productoController");

function route(req, res) {
  // Ignorar query params y barra final para el match de rutas
  let url = req.url.split('?')[0];
  if (url.endsWith('/')) url = url.slice(0, -1);

  if (req.method === "GET" && url === "/api/productos") {
    listarProductos(res);
  } else if (req.method === "POST" && url === "/api/productos") {
    crearProducto(req, res);
  } else if (req.method === "PUT" && /^\/api\/productos\/\d+$/.test(url)) {
    const id = parseInt(url.split("/")[3]);
    if (!isNaN(id)) {
      actualizarProducto(req, res, id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "ID inválido" }));
    }
  } else if (req.method === "DELETE" && /^\/api\/productos\/\d+$/.test(url)) {
    const id = parseInt(url.split("/")[3]);
    if (!isNaN(id)) {
      eliminarProducto(res, id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "ID inválido" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
}

module.exports = { route };