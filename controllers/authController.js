const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Email / Password no son correctos",
      });
    }
    // Verificar si el usario esta activo
    if (!usuario.status) {
      return res.status(400).json({
        msg: "Email / Password no son correctos",
      });
    }
    // verificar la password
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Email / Password no son correctos",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario._id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Algo salio mal");
  }
};

module.exports = {
  login,
};
