const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Token no enviado",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "El usuario no existe",
      });
    }
    // Verificar si el uid tiene status en true
    if (!usuario.status) {
      return res.status(401).json({
        msg: "Token no valido",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
