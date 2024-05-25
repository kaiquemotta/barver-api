const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const database = require('./config/database');

// Middleware para análise de corpos de solicitação JSON
app.use(bodyParser.json());

// Lidar com rotas inexistentes
// Defina o diretório onde suas imagens de erro estão localizadas
const imageDirectory = path.join(__dirname, 'public', 'images');

// Rotas de usuário
app.use('/api/users', userRoutes);


// Middleware para lidar com rotas inexistentes
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(imageDirectory, 'not_found_image.png'));
});

// Lidar com erros internos do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});