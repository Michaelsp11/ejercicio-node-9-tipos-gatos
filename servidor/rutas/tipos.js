const express = require("express");
const { check, validationResult, checkSchema } = require("express-validator");

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
router.get(
  "/tipo/:id",
  check("id", "Id incorrecta").isInt(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores.array());
      const nuevoError = new Error(errores.array().map((error) => error.msg));
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const tipo = await mostrarTipo(id);
      res.json(tipo);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/nuevo-tipo",
  checkSchema({
    id: {
      isInt: true,
      errorMessage: "El id solo puede ser un número",
    },
    tipo: {
      matches: {
        options: /^[a-zA-Z]+\s?[a-zA-Z]*$/,
        errorMessage: "El tipo solo puede contener letras",
      },
    },
  }),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores);
      const nuevoError = new Error(
        JSON.stringify(errores.array().map((error) => error.msg))
      );
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  async (req, res, next) => {
    try {
      const nuevoTipo = req.body;
      const nuevoTipoBD = await crearTipo(nuevoTipo);
      res.status(201).json(nuevoTipoBD);
    } catch (err) {
      next(err);
    }
  }
);
router.put(
  "/tipo/:id",
  check("id", "Id incorrecta").isInt(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores.array());
      const nuevoError = new Error(errores.array().map((error) => error.msg));
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  async (req, res, next) => {
    try {
      const tipoModificado = req.body;
      const tipoUpdated = await modificarTipo(tipoModificado);
      res.json(tipoUpdated);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/tipo/:id",
  check("id", "Id incorrecta").isInt(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores.array());
      const nuevoError = new Error(errores.array().map((error) => error.msg));
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const tipoBorrado = await borrarTipo(id);
      res.json(tipoBorrado);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
