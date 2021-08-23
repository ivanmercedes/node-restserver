const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

const uploadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No hya archivo que subir" });
    return;
  }

  const { file } = req.files;

  const nombreCortado = file.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  // Validar la extesion
  const extesionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extesionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extesion ${extension} no es permitida, por favor prueba con otro archivo que tenga la extensiones ${extesionesValidas}`,
    });
  }

  const nombreTemp = uuidv4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "Archivo subido a " + uploadPath });
  });
};

module.exports = {
  uploadFile,
};
