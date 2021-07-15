const Tipo = require("../modelos/Tipo");

const listarTipos = async () => {
  try {
    const tipos = await Tipo.find();
    if (tipos.length === 0) {
      const nuevoError = new Error("No hay ningún tipo en la base de datos.");
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return tipos;
  } catch (err) {
    const nuevoError = new Error("No se ha podido obtener el listado de tipos");
    throw err.codigo ? err : nuevoError;
  }
};
const mostrarTipo = async (idTipo) => {
  try {
    const tipo = await Tipo.findOne({
      id: idTipo,
    });
    if (!tipo) {
      const nuevoError = new Error("No existe el tipo con esta id");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    return tipo;
  } catch (err) {
    const nuevoError = new Error("No se ha podido obtener el tipo");
    throw err.codigo ? err : nuevoError;
  }
};
const crearTipo = async (nuevoTipo) => {
  try {
    const nuevoTipoBD = await Tipo.create(nuevoTipo);
    return nuevoTipoBD;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el tipo");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const modificarTipo = async (tipoModificado) => {
  try {
    const tipoModificadoBD = await Tipo.updateOne(
      { id: tipoModificado.id },
      tipoModificado
    );
    return tipoModificadoBD;
  } catch (err) {
    const nuevoError = new Error("No se ha podido editar el tipo");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const borrarTipo = async (idTipo) => {
  try {
    const tipoBorrado = await Tipo.deleteOne({ id: idTipo });
    if (!tipoBorrado.ok === 1) {
      const nuevoError = new Error("No se ha podido borrar el tipo");
      throw nuevoError;
    }
    return tipoBorrado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido borrar el tipo");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
module.exports = {
  listarTipos,
  mostrarTipo,
  crearTipo,
  modificarTipo,
  borrarTipo,
};
