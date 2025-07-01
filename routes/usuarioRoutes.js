const {
  crearUsuario,
  listarUsuarios
} = require("../controllers/usuarioController");

function usuarioRoute(req, res) {
  if (req.method === "POST" && req.url === "/api/usuarios") {
    crearUsuario(req, res);
  } else if (req.method === "GET" && req.url === "/api/usuarios") {
    listarUsuarios(res);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end("Ruta no encontrada");
  }
}

module.exports = {
  usuarioRoute
};
