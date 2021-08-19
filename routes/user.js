const { Router } = require('express');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/userController');

const router = Router();

router.get('/', usuarioGet );
router.put('/:id', usuarioPut);
router.post('/', usuarioPost);
router.delete('/', usuarioDelete);
router.patch('/', usuarioPatch);


module.exports = router;