const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
} = require("../controllers/userController");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
// const { validarCampos } = require("../middlewares/validar-campos");
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { esAdmin, tieneRole } = require("../middlewares/validar-roles");

const {
  validarCampos,
  validarJWT,
  esAdmin,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", usuarioGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioPut,
);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    // check('rol','No es valido').isIn(['ADMIN_ROL','USER_ROL']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuarioPost,
);
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdmin,
    tieneRole("ADMIN_ROL", "USER_ROL"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioDelete,
);
router.patch("/", usuarioPatch);

module.exports = router;
