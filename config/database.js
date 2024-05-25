require('dotenv').config();


const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGO_URI);

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexão bem-sucedida com o banco de dados MongoDB');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    });