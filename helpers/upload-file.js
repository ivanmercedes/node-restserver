const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFiles = (
  files,
  extesionesValidas = ["png", "jpg", "jpeg", "gif"],
  folder = "",
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const nombreCortado = file.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extesion
    if (!extesionesValidas.includes(extension)) {
      return reject(
        `La extesion ${extension} no es permitida, por favor prueba con otro archivo que tenga la extensiones ${extesionesValidas}`,
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, nombreTemp);

    file.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  uploadFiles,
};
