

module.exports = {
    getAllPosts: (req, res) => {
        console.log('post controllers working!')
    },
    getCurrentUserPosts: (req, res) => {
        const id = req.params.userId;
        console.log(`getting user posts for user id ${id}..`)
    },
    addPost: (req, res) => {
        const msg = req.body;
        console.log(`You post: ${msg}`)
    },
    editPost: (req, res) => {

    },
    deletePosts: (req, res) => {

    },
}