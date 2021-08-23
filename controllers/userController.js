const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usuarioGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  // const {nombre, edad} = req.body;
  // const {test, perro } = req.query;
  //   const usuarios = await Usuario.find({ status: true })
  //     .skip(Number(desde))
  //     .limit(Number(limit));
  //   const total = await Usuario.countDocuments({ status: true });

  const [total, usuarios] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(Number(desde)).limit(Number(limit)),
  ]);
  res.json({
    total,
    usuarios,
  });
};
const usuarioPost = async (req, res = response) => {
  const { name, email, password, ip, rol } = req.body;
  const usuario = new User({ name, email, password, ip, rol });

  // verificar si el correo existe
  const existeEmail = await User.findOne({ email });

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

  const usuario = await User.findByIdAndUpdate(id, resto);

  res.json(usuario);
};
const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await User.findByIdAndUpdate(id, { status: false });

  res.json({ usuario });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
