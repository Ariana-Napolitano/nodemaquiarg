const Joi = require("@hapi/joi");

const schemas = {
  create: Joi.object().keys({
    nombre: Joi.string().min(3).required(),
    apellido: Joi.string().required(),
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
    direccionEnvio: {
      direccion: Joi.string().required(),
      ciudad: Joi.string().required(),
      provincia: Joi.string().required(),
      cp: Joi.number().min(4).required(),
    },
  }),
  modify: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    nombre: Joi.string().min(3).optional(),
    apellido: Joi.string().optional(),
    mail: Joi.string().email().optional(),
    password: Joi.string().optional(),
    direccionEnvio: {
      direccion: Joi.string().optional(),
      ciudad: Joi.string().optional(),
      provincia: Joi.string().optional(),
      cp: Joi.number().min(4).optional(),
    },
  }),
};

module.exports = { schemas };
