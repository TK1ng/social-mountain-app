require('dotenv').config();

const { sequelize } = require('./util/database');
const { User } = require('./models/user');
const { Post } = require('./models/posts');


const cors = require('cors');
const { SECRET, PORT } = process.env;
const { login, logout, register } = require('./controllers/auth');
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts');
const { isAuthenticated } = require('./middleware/isAuthenticated');

const express = require('express');

const app = express();

User.hasMany(Post);
Post.belongsTo(User);

app.use(cors());
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

app.get('/userposts/:userId', getCurrentUserPosts);
app.get('/posts', getAllPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

sequelize.sync()
    .then(res => {
        app.listen(PORT, () => {
            console.log(`db synced! Listening on port ${PORT}`)
        });
    })
    .catch(err => {
        console.log(err);
    })
