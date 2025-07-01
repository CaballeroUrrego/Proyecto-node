const { sql, poolPromise } = require("../config/db");

// Lógica de aplicación: Validar antes de crear producto
async function crearProducto(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const nuevoProducto = JSON.parse(body);

      // Validación de lógica de aplicación
      if (!nuevoProducto.nombre || typeof nuevoProducto.nombre !== "string") {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            error: "El nombre es obligatorio y debe ser texto."
          })
        );
      }
      if (
        typeof nuevoProducto.precio !== "number" ||
        nuevoProducto.precio <= 0
      ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "El precio debe ser un número mayor a 0." })
        );
      }
      if (typeof nuevoProducto.stock !== "number" || nuevoProducto.stock < 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            error: "El stock debe ser un número igual o mayor a 0."
          })
        );
      }

      // Si pasa las validaciones, se crea el producto
      const productoCreado = await productoModel.crearProducto(nuevoProducto);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(productoCreado));
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error del servidor");
  }
}

// Obtener productos
async function obtenerProductos() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Productos");
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

// Actualizar producto
async function actualizarProducto(id, datos) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, datos.nombre)
      .input("precio", sql.Decimal(18, 2), datos.precio)
      .input("stock", sql.Int, datos.stock)
      .query(
        "UPDATE Productos SET nombre=@nombre, precio=@precio, stock=@stock WHERE id=@id; SELECT * FROM Productos WHERE id=@id"
      );
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Productos WHERE id=@id");
    return { mensaje: "Producto eliminado" };
  } catch (error) {
    throw error;
  }
}

// Ejemplo de función correcta en el modelo:
async function crearProducto(producto) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("nombre", sql.VarChar, producto.nombre)
      .input("precio", sql.Decimal(18, 2), producto.precio)
      .input("stock", sql.Int, producto.stock)
      .query("INSERT INTO Productos (nombre, precio, stock) OUTPUT INSERTED.* VALUES (@nombre, @precio, @stock)");
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
