// UsuarioService.js

const Usuario = require('../models/Usuario');

class UsuarioService {
    async getUsuarios() {
        return await Usuario.find();
    }

    async getUsuarioById(id) {
        return await Usuario.findById(id);
    }

    async getUsuarioByEmail(email) {
        return await Usuario.findOne({ email });
    }

    async createUsuario(usuarioData) {
        const usuario = new Usuario(usuarioData);
        return await usuario.save();
    }

    async updateUsuario(id, usuarioData) {
        const usuario = await Usuario.findById(id);
        if (!usuario) throw new Error('Usuário não encontrado');
        
        // Atualiza os campos do usuário com os dados fornecidos
        Object.assign(usuario, usuarioData);
        usuario.data_alteracao = Date.now();
        
        return await usuario.save();
    }

    async deleteUsuario(id) {
        const usuario = await Usuario.findById(id);
        if (!usuario) throw new Error('Usuário não encontrado');
        
        return await usuario.remove();
    }
}

module.exports = new UsuarioService();