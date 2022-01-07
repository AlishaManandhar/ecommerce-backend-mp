const { User, encrypt } = require("../models/User")
const jwt = require("jsonwebtoken")

require("dotenv").config()

verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message })
        }
        else {
            req.body.userId = decoded.id
            req.body.role = decoded.role
            next()
        }
    })


}

module.exports.verifyToken = verifyToken

module.exports.verifyTokenAndAdmin = async (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.body.role == "admin") {
            next();
        } else {
            res.status(403).json({error:"You are not allowed to do that!"});
        }
    })
}

module.exports.verifyTokenAndProductAdder = async (req, res, next) => {

    verifyToken(req, res, () => {
        if ((req.body.role === "admin") || (req.body.role ==="product-adder")) {
            next()
        } else {
            res.status(403).json({error:"You are not allowed to do that!"});
        }
    })
}