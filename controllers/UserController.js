const UsuarioService = require('../services/UsuarioService');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await UsuarioService.getUsuarioById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarioByEmail = async (req, res) => {
    try {
        const usuario = await UsuarioService.getUsuarioByEmail(req.params.email);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const savedUser = await UsuarioService.createUsuario(req.body);
        console.log('savedUser' + savedUser)
        return res.status(201)
            .location(`/usuarios/${savedUser._id}`)
            .json({ message: `Usuário com o id ${savedUser._id} criado com sucesso` });
    } catch (error) {
        if (error.code === 11000 && error.errmsg.includes('duplicate key error')) {
            return res.status(409).json({ message: 'O email fornecido já está em uso' });
        } else {
            return res.status(500).json({ message: 'Ocorreu um erro ao processar a solicitação' });
        }
    }
};

const updateUsuario = async (req, res) => {
    try {
        const usuarioAtualizado = await UsuarioService.updateUsuario(req.params.id, req.body);
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        await UsuarioService.deleteUsuario(req.params.id);
        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByEmail
};