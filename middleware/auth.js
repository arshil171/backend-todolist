const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization


        if (!token) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        console.log(decoded)

        req.body.authorId = decoded.userData._id;
        // console.log(req.body.authorId)
        next();


    } catch (error) {
        return res.status(401).json({ message: error });
    }
}


module.exports = { auth }