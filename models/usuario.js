const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria']
    },
    avatar: {
        type: String,
    },
    ip: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false 
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', UsuarioSchema);