const http = require("http");
const fs = require("fs");
const path = require("path");
const { route: productoRoute } = require("./routes/productoRoutes");
const { usuarioRoute } = require("./routes/usuarioRoutes");
const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.static("public")); // <-- Esta línea es clave

const server = http.createServer((req, res) => {
  // Servir archivos estáticos de /public (CSS, JS, imágenes, etc.)
  const staticFilePath = path.join(__dirname, "public", req.url);
  if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
    const ext = path.extname(staticFilePath).toLowerCase();
    let contentType = "text/plain";
    if (ext === ".css") contentType = "text/css";
    else if (ext === ".js") contentType = "application/javascript";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".ico") contentType = "image/x-icon";
    else if (ext === ".html") contentType = "text/html";

    fs.readFile(staticFilePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
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
