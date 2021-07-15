require("dotenv").config();
const debug = require("debug")("api-gatos:servidor:principal");
const cors = require("cors");
const express = require("express");
const morganFreeman = require("morgan");
const { error404, errorGeneral } = require("./errores");
const rutasTipos = require("./rutas/tipos");

const { app } = require("./init");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

app.use("/tipos", rutasTipos);

app.use(error404);
app.use(errorGeneral);
