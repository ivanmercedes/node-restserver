const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarArchivoSubir } = require("../middlewares");
const {
  uploadFile,
  updateFile,
  getFile,
} = require("../controllers/uploadController");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", validarArchivoSubir, uploadFile);
router.put(
  "/:collection/:id",
  [
    validarArchivoSubir,
    check("id", "El id no es valido").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["user", "product"]),
    ),
    validarCampos,
  ],
  updateFile,
);

router.get(
  "/:collection/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["user", "product"]),
    ),
    validarCampos,
  ],
  getFile,
);
module.exports = router;
