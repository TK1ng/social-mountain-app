require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        // retrieves Athorization HTTP request header and stores in headerToken variable
        const headerToken = req.get('Authorization')
        // if no Authorization request header is present, error is thrown
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            // checking to confirm that token passed from client is valid and has not been manipulated.
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            // catch any error with the above expression
            err.statusCode = 500
            throw err
        }
        // Checks if token verification returns false. If so, user is not authenticated and this code block handles that case
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        // prompts for the next middleware function
        next()
    }
}