const productoModel = require("../models/productoModel");

async function listarProductos(res) {
  try {
    const productos = await productoModel.obtenerProductos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productos));
  } catch (err) {
    console.error(err); // <-- Aquí ves el error real
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

async function crearProducto(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
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

// Nuevo: Actualizar producto (PUT)
async function actualizarProducto(req, res, id) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const datos = JSON.parse(body);
      const actualizado = await productoModel.actualizarProducto(id, datos);
      if (actualizado) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(actualizado));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Producto no encontrado" }));
      }
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

// Nuevo: Eliminar producto (DELETE)
async function eliminarProducto(res, id) {
  try {
    await productoModel.eliminarProducto(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Producto eliminado" }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

module.exports = {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
