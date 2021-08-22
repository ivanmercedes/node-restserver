const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todas las categorias - publica
router.get("/", (req, res) => {
  res.json("get");
});

// Obtener una categorias - publica
router.get("/:id", (req, res) => {
  res.json("get");
});

// Crear categorias - privado Cualquier rol
router.post("/", (req, res) => {
  res.json("post");
});

// Actualizar - privado
router.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar categorias - privado ( Admin )
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
