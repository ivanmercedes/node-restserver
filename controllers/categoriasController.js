const { response } = require("express");
const { Category } = require("../models");

// obtener categorias - paginado - total - populate
const getCategorias = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const [total, categorias] = await Promise.all([
    Category.countDocuments({ status: true }),
    Category.find({ status: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);
  res.json({
    total,
    categorias,
  });
};

// obtener categoria -  populate {}
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Category.findById(id).populate("user", "name");

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoriaDB = await Category.findOne({ name });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.usuario._id,
  };

  const categoria = new Category(data);
  await categoria.save();

  res.status(201).json(categoria);
};

// Actualizar categoria
const categoriaUpdate = async (req, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const categoria = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );

  res.json(categoria);
};

// Borrar categoria - status:false
const categoriaDelete = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true },
  );

  res.json({ categoria });
};
module.exports = {
  getCategorias,
  obtenerCategoria,
  crearCategoria,
  categoriaDelete,
  categoriaUpdate,
};
