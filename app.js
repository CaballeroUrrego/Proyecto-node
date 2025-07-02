const http = require("http");
const fs = require("fs");
const path = require("path");
const { route: productoRoute } = require("./routes/productoRoutes");
const { usuarioRoute } = require("./routes/usuarioRoutes");
const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.static("public"));

const server = http.createServer((req, res) => {
  // Servir archivos estáticos de /public si la URL termina en .html
  if (req.url.endsWith(".html")) {
    const filePath = path.join(__dirname, "public", req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Archivo no encontrado");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Conectado a servidor privado caballero Urrego ");
  } else if (req.url.startsWith("/api/usuarios")) {
    usuarioRoute(req, res);
  } else {
    productoRoute(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
