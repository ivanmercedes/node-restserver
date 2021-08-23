const { response } = require("express");
const { uploadFiles } = require("../helpers");

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No hya archivo que subir" });
    return;
  }

  // Imagenes
  const nombre = await uploadFiles(req.files);
  res.json({
    nombre,
  });
};

module.exports = {
  uploadFile,
};
