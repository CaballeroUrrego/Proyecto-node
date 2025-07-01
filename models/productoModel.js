const { sql, poolPromise } = require("../config/db");

async function obtenerProductos() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Productos");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// Nuevo: Crear producto
async function crearProducto(producto) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.VarChar, producto.nombre)
      .input('precio', sql.Decimal(18, 2), producto.precio)
      .input('stock', sql.Int, producto.stock)
      .query("INSERT INTO Productos (nombre, precio, stock) OUTPUT INSERTED.* VALUES (@nombre, @precio, @stock)");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { obtenerProductos, crearProducto };