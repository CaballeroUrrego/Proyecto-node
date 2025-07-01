const productoModel = require("../models/productoModel");

async function listarProductos(res) {
  try {
    const productos = await productoModel.obtenerProductos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productos));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

// Nuevo: Crear producto (ejemplo para POST)
async function crearProducto(req, res) {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const nuevoProducto = JSON.parse(body);
      const productoCreado = await productoModel.crearProducto(nuevoProducto);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(productoCreado));
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

module.exports = { listarProductos, crearProducto };