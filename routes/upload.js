const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { uploadFile } = require("../controllers/uploadController");

const router = Router();

router.post("/", uploadFile);

module.exports = router;
