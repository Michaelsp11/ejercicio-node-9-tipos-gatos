const { Schema, model } = require("mongoose");

const TipoSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
});

const Tipo = model("Tipo", TipoSchema, "tipos");

module.exports = Tipo;
