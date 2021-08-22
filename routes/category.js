const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  categoriaDelete,
  categoriaUpdate,
  getCategorias,
  obtenerCategoria,
} = require("../controllers/categoriasController");
const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const { existeCategoriaPorID } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publica
router.get("/", getCategorias);

// Obtener una categorias - publica
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  obtenerCategoria,
);

// Crear categorias - privado Cualquier rol
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria,
);

// Actualizar - privado
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("name", "El nomre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  categoriaUpdate,
);

// Borrar categorias - privado ( Admin )
router.delete(
  "/:id",
  [
    validarJWT,
    esAdmin,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  categoriaDelete,
);

module.exports = router;
