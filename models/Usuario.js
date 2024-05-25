const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  perfil: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  data_cadastro: {
    type: Date,
    required: true
  },
  data_alteracao: {
    type: Date,
    required: true
  }
});


usuarioSchema.statics.criarUsuario = function (dadosUsuario) {
  console.log(`novo user = ` + dadosUsuario);
  return new this({
    nome: dadosUsuario.nome,
    telefone: dadosUsuario.telefone,
    email: dadosUsuario.email,
    perfil: dadosUsuario.perfil,
    senha: dadosUsuario.senha,
    data_cadastro: Date.now(),
    data_alteracao: Date.now()
  });
};

usuarioSchema.methods.remove = function(callback) {
  return this.model('Usuario').deleteOne({ _id: this._id }, callback);
};

module.exports = mongoose.model('Usuario', usuarioSchema);