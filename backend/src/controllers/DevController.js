const axios = require('axios');
const Dev = require('../models/Dev');
module.exports = {
    async index(req, res) {
        // Pega os dados do usuário logado
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        // Retorna outros usuários que não seja o usuário logado
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ],
        })
        return res.json(users);
    },
    async store(req, res) {
        const { username } = req.body;
        //Verificar se o Usuário existe
        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return res.json(userExists);
        }
        // Acessa a API do GitHub
        const response = await axios.get(`https://api.github.com/users/${username}`)
            // Puxa os objetos name, bio etc da API
        const { name, bio, avatar_url: avatar } = response.data;
        // Inserindo no Banco de dados
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });
        return res.json(dev);
    }
};