const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await User.findOne({ email });
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

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, avatar } = await googleVerify(id_token);

    let usuario = await User.findOne({ email });

    if (!usuario) {
      // tengo que crearlo
      const data = {
        name,
        email,
        avatar,
        password: ":P",
        google: true,
      };
      usuario = new User(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.status) {
      return res.status(401).json({
        msg: "User bloqueado",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "token no valido",
    });
  }
};
module.exports = {
  login,
  googleSignin,
};
