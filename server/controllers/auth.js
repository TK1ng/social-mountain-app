require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { SECRET } = process.env;

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const foundUser = await User.findOne({ where: { username: username } });

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);

                if (isAuthenticated) {
                    const token = createToken({ username: foundUser.username, id: foundUser.id });
                    const exp = Date.now() + 1000 * 60 * 60 * 48;

                    res.status(200).send(
                        {
                            username: foundUser.username,
                            id: foundUser.id,
                            token,
                            exp
                        }
                    );
                } else {
                    res.status(401).send('Username/Password incorrect');
                }
            } else {
                res.status(400).send('User does not exist. Try registering for account.');
            }

        } catch (err) {
            console.error('Login error', err);
        }
    },
    logout: (req, res) => {
        console.log('logging out...')
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
