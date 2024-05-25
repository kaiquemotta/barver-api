const mongoose = require('mongoose');
const Administrador = require('./Administrador');

const administradorSchema = new mongoose.Schema({

});

module.exports = Usuario.discriminator('Administrador', administradorSchema);