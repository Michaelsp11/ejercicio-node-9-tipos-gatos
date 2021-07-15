const express = require("express");
const {
  listarTipos,
  mostrarTipo,
  crearTipo,
  modificarTipo,
  borrarTipo,
} = require("../../db/controladores/tipos");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    const tipos = await listarTipos();
    res.json(tipos);
  } catch (err) {
    next(err);
  }
});
router.get("/tipo/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tipo = await mostrarTipo(id);
    res.json(tipo);
  } catch (err) {
    next(err);
  }
});
router.post("/nuevo-tipo", async (req, res, next) => {
  const { nuevoTipo } = req.body;
  try {
    const nuevoTipoBD = await crearTipo(nuevoTipo);
    res.status(201).json(nuevoTipoBD);
  } catch (err) {
    next(err);
  }
});
router.put("/tipo/:id", async (req, res, next) => {
  const { tipoModificado } = req.body;
  try {
    const tipoUpdated = await modificarTipo(tipoModificado);
    res.json(tipoUpdated);
  } catch (err) {
    next(err);
  }
});
router.delete("/tipo/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const tipoBorrado = await borrarTipo(id);
    res.json(tipoBorrado);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
