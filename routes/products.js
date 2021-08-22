const { Router } = require("express");
const { check } = require("express-validator");
const {
  productCreate,
  productDelete,
  productUpdate,
  getProducts,
  getProduct,
} = require("../controllers/productController");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  existeProductPorID,
  existeCategoriaPorID,
} = require("../helpers/db-validators");

const router = Router();

// Obtener todas las Products - publica
router.get("/", getProducts);

// Obtener una Products - publica
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductPorID),
    validarCampos,
  ],
  getProduct,
);

// Crear Products - privado Cualquier rol
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "La categoria es obligatoria").not().isEmpty(),
    check("category", "La categoria no es valida").isMongoId(),
    check("category").custom(existeCategoriaPorID),
    validarCampos,
  ],
  productCreate,
);

// Actualizar - privado
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductPorID),
    validarCampos,
  ],
  productUpdate,
);

// Borrar Products - privado ( Admin )
router.delete(
  "/:id",
  [
    validarJWT,
    esAdmin,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductPorID),
    validarCampos,
  ],
  productDelete,
);

module.exports = router;
