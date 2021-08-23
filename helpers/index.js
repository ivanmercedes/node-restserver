const dbValidator = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const uploadFiles = require("./upload-file");

module.exports = {
  ...dbValidator,
  ...generarJWT,
  ...googleVerify,
  ...dbValidator,
  ...uploadFiles,
};
