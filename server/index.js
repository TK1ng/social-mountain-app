require('dotenv').config();
const cors = require('cors');
const { SECRET, PORT } = process.env;

const { login, logout, register } = require('./controllers/auth');
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePosts } = require('./controllers/posts');
const { isAuthenticated } = require('./middleware/isAuthenticated');




const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

app.get('/userposts/:userId', getCurrentUserPosts);
app.get('/posts', getAllPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePosts);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});