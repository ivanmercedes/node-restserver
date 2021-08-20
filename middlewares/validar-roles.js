const { response } = require("express");

const esAdmin = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quire verificar el role sin validar el token primero",
    });
  }

  const { rol, name } = req.usuario;

  if (rol !== "ADMIN_ROL") {
    return res.status(401).json({
      msg: `${name} no tiene permiso para hacer esto`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quire verificar el role sin validar el token primero",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: "No tienes permiso para esta accion",
      });
    }
    next();
  };
};

module.exports = {
  esAdmin,
  tieneRole,
};
