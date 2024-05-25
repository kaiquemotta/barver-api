const mongoose = require('mongoose');
const Usuario = require('./Usuario');

const barbeiroSchema = new mongoose.Schema({

});

module.exports = Usuario.discriminator('Barbeiro', barbeiroSchema);