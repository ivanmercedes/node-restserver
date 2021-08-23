const { Usuario, Category, Role, Product } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ya esta registrado...`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe...`);
  }
};

const existeCategoriaPorID = async (id = "") => {
  const existeCategory = await Category.findById(id);
  if (!existeCategory) {
    throw new Error(`El id no existe...`);
  }
};

const existeProductPorID = async (id = "") => {
  const existeProduct = await Product.findById(id);
  if (!existeProduct) {
    throw new Error(`El id no existe...`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`,
    );
  }
  return true;
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorID,
  existeProductPorID,
  coleccionesPermitidas,
};
