const { User,encrypt } = require("../models/User")
 const bcrypt = require("bcrypt")
 const {registerMail} = require("../middlewares/mailer")
require("dotenv").config()

const validKeys = (arr) => {
    const allowedKeys = ["firstname", "lastname", "email", "contact", "passwordDate", "password", "role"]
    const isMatch = arr.filter(key => allowedKeys.includes(key));
    if (isMatch.length == arr.length)
        return true
    return false

}

module.exports.register = async (req, res) => {
    
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user != null) {
            res.status(400).send({
                error: "Email already in use"
            })
        }
        user = await User.findOne({ contact: req.body.contact })
        if (user!= null) {
            res.status(400).send({
                error: "Contact already in use"
            })
        }
        else if(validKeys(Object.keys(req.body))){
            
            req.body.password = await encrypt(req.body.password)
            user = new User(req.body)
            await user.save()

            
            await registerMail(user.email, user.firstname, user.lastname)
            res.status(200).send({
              message: "User Account Created"
            })

        }
        else{
            res.status(400).send({"error": "Invalid operation"})
        }
       
    } catch (error) {
        res.status(400).send(error)
    }


}

module.exports.login = async (req,res) => {
    const email = req.body.email.trim().toLowerCase()
    let password = req.body.password

    const user = await  User.findOne({email}).populate("role","role")
    
    if (!user)
    {
        res.status(400).send({password: "Email not found"})
    }
    else
    {
       const isMatch =  bcrypt.compareSync(password, user.password)
       if (!isMatch) res.status(400).send({password: "Wrong Email or Password"})
       else{
            const token = await user.generateAuthToken()
            res.status(200).send({data:user,token})
       }
    }
    
} 