const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuarioGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  // const {nombre, edad} = req.body;
  // const {test, perro } = req.query;
  //   const usuarios = await Usuario.find({ status: true })
  //     .skip(Number(desde))
  //     .limit(Number(limit));
  //   const total = await Usuario.countDocuments({ status: true });

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ status: true }),
    Usuario.find({ status: true }).skip(Number(desde)).limit(Number(limit)),
  ]);
  res.json({
    total,
    usuarios,
  });
};
const usuarioPost = async (req, res = response) => {
  const { name, email, password, ip, rol } = req.body;
  const usuario = new Usuario({ name, email, password, ip, rol });

  // verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado...",
    });
  }

  // Encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    msg: "post API - Controller",
    usuario,
  });
};
const usuarioPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO: validar password
  if (password) {
    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};
const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  // borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id); // borrar los usuario de esta manera hace que se pierda la integridad de referencia

  // Desactivar el usuario
  const usuario = await Usuario.findByIdAndUpdate(id, { statuss: false });
  res.json(usuario);
};
const usuarioPatch = (req, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
};
