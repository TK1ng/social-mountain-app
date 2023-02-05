require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { SECRET } = process.env;

module.exports = {
    login: (req, res) => {
        console.log('logging in...');
    },
    logout: (req, res) => {
        console.log('logging out...');
    },
    register: async (req, res) => {

        try {
            const { username, password } = req.body;
            const foundUser = await User.findOne({ where: { username: username } });

            if (foundUser) {
                res.status(400).send('User already exists. Try signing in.');
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({ username: username, hashedPass: hash });

                const token = createToken({ username: newUser.dataValues.username, id: newUser.dataValues.id });
                console.log('token!')
                // create expiration date based on expiresIn time set in .sign method because this method does not return the expiration
                const exp = Date.now() + 1000 * 60 * 60 * 48;

                res.status(201).send({
                    username: newUser.dataValues,
                    id: newUser.dataValues.id,
                    token,
                    exp
                });
            }
        } catch (err) {
            console.error('Register error', err);
            res.sendStatus(400);
        }
    }
}

const createToken = (username, id) => {
    return jwt.sign({ username: username, id: id }, SECRET, {
        expiresIn: '2 days'
    })
}
