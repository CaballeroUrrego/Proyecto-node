const { sql, poolPromise } = require("../config/db");

async function crearUsuario(username, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar(50), username)
      .input("password", sql.VarChar(255), password)
      .query(
        "INSERT INTO Usuarios (username, password) VALUES (@username, @password); SELECT SCOPE_IDENTITY() AS id;"
      );
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

async function obtenerUsuarios() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, username FROM Usuarios");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

module.exports = { crearUsuario, obtenerUsuarios };
