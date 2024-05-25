const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarioByEmail = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.params.email });
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const usuario = Usuario.criarUsuario(req.body);
        const savedUser = await usuario.save();
        return res.status(200).json({ message: `Usuário com o id ${savedUser._id} criado com sucesso` });
    } catch (error) {
        console.log(error);
        if (error.code === 11000 && error.errmsg.includes('duplicate key error')) {
            return res.status(409).json({ message: 'O email fornecido já está em uso' });
        } else {
            return res.status(500).json({ message: 'Ocorreu um erro ao processar a solicitação' });
        }
    }
};

const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

        usuario.nome = req.body.nome;
        usuario.telefone = req.body.telefone;
        usuario.email = req.body.email;
        usuario.perfil = req.body.perfil;
        usuario.senha = req.body.senha;
        usuario.data_alteracao = Date.now();

        const usuarioAtualizado = await usuario.save();
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

        await usuario.remove();
        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        console.log((error))
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