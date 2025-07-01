const usuarioModel = require("../models/usuarioModel");

async function crearUsuario(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(body);
      const usuario = await usuarioModel.crearUsuario(username, password);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id: usuario.id, username }));
    } catch (err) {
      console.error("Error al crear usuario:", err);
      if (
        err.code === "EREQUEST" &&
        err.message.includes("UNIQUE KEY constraint")
      ) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("El nombre de usuario ya existe");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al crear usuario");
      }
    }
  });
}

async function listarUsuarios(res) {
  try {
    const usuarios = await usuarioModel.obtenerUsuarios();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error al listar usuarios");
  }
}

module.exports = { crearUsuario, listarUsuarios };
