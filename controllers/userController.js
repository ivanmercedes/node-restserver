const { response, request } = require('express')

const usuarioGet = (req = request, res = response) =>{

    const {nombre, edad} = req.body;
    const {test, perro } = req.query;

    res.json({
        msg: 'get API - Controller',
        nombre, 
        edad,
        test,
        perro
    });
}
const usuarioPost = (req, res = response) =>{
    res.json({
        msg: 'post API - Controller'
        
    });
}
const usuarioPut = (req, res = response) =>{
    
    const {id} = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    });
}
const usuarioDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - Controller'
    });
}
const usuarioPatch = (req, res = response) =>{
    res.json({
        msg: 'patch API - Controller'
    });
}


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}