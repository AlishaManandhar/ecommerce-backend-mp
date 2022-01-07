const { User, encrypt } = require("../models/User")
const bcrypt = require("bcrypt")

const validKeys = (arr) => {
    const allowedKeys = ["firstname", "lastname", "email", "contact", "passwordDate", "password", "role", "userId"]
    const isMatch = arr.filter(key => allowedKeys.includes(key));
    if (isMatch.length == arr.length)
        return true
    return false

}
module.exports.changeName = async (req, res) => {
    
    try {
        if (validKeys(Object.keys(req.body)))
        {
            const firstname = req.body.firstname.trim()
            const lastname = req.body.lastname.trim()
            const user = await User.findById(req.body.userId)
            if (!user) {
                res.status(400).send({ error: "Invalid operation" })
            }
            else {
                user.firstname = firstname
                user.lastname = lastname
                await user.save()
    
                res.status(200).send({ user, message: "User name  updated" })
    
            }
        }
        else
        {
            res.status(400).send({error: "Invalid Operation"})
        }

    }
    catch (err) {
        res.status(400).send(err)
    }
}

module.exports.changeContact = async (req, res) => {
    try {
        const contact = req.body.contact.trim()
        let user = await User.findOne({ contact })
        if (user) {
            res.status(400).send({ error: "Contact already in use" })
        }

        user = await User.findById(req.body.userId)

        if (!user) {
            res.status(400).json({ error: "Invalid operation" })
        }
        else {
            user.contact = contact
            await user.save()

            res.status(200).send({ user, message: "User Contact  updated" })

        }

    }
    catch (err) {
        res.status(400).send(err)
    }

}


module.exports.changeEmail = async (req, res) => {


    try {
        const email = req.body.email.trim().toLowerCase()
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).send({ error: "Email already in use" })
        }

        user = await User.findById(req.body.userId)

        if (!user) {
            res.status(400).send({ error: "Invalid operation" })
        }
        else {
            user.email = email
            await user.save()

            res.status(200).send({ user, message: "User Email  updated" })

        }

    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.changePassword = async (req, res) => {


    try {
        const newPassword = req.body.newPassword
        const oldPassword = req.body.oldPassword
        if (newPassword == oldPassword)
        {
            return res.status(400).send({error: "Old password and new Password cant be same"})
        }
        const user = await User.findById(req.body.userId)
        
        if (!user) {
            res.status(400).send({ error: "Invalid operation" })
        }
        else {
            
            const isMatch = bcrypt.compareSync(oldPassword, user.password)
            if (!isMatch)
                res.status(400).send({ error: "Wrong Old Password" })
            else {
                
                user.password = await encrypt(newPassword)
                user.passwordDate = new Date()
                
                await user.save()
                res.status(200).send({ user, message: "User Password Changed" })
            }

        } 

    }
    catch (err) {
        res.status(400).send(err)
    }

}


