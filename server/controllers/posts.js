const { Post } = require('../models/user');
const { User } = require('../models/user');

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: { privateStatus: false },
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPosts: async (req, res) => {
        try {
            const id = req.params.userId;
            const posts = await Post.findAll({
                where: { userId: id },
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }

    },
    addPost: async (req, res) => {
        try {
            const { title, content, status, userId } = req.body;

            await Post.create({ title: title, content: content, userId: userId, privateStatus: status });

            res.sendStatus(201);
        } catch (err) {
            console.log('ERROR IN addPost', err);
            res.sendStatus(400);
        }
    },
    editPost: (req, res) => {

    },
    deletePosts: (req, res) => {

    },
}