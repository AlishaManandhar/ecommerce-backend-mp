const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: "Firstname is required",
        trim: true,
        minlength: 2
    },
    lastname: {
        type: String,
        required: "Lastname is required",
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        required: "Password is required",
    },
    passwordDate: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        lowercase: true,
        trim: true
    },
    contact: {
        type: String,
        required: "Phone number is required",
        unique: true,
        minlength: 10
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required:"Role is required",
        ref: "Role"
    }


}, { timestamps: true })

// userSchema.statics.findByCredentials = async function (email, password) {
//     const user = await this.findOne({ email: email })

//     if (!user) return null

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) return null

//     return user

// };

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    if (userObject.role.role)
    {
        userObject.role =userObject.role.role
    }
    else if (userObject.role){
        delete userObject.role
    }
    
     
    

    return userObject

}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ id: user._id, role: this.role.role }, process.env.JWT_KEY, { expiresIn: "10d" })

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


module.exports.User = mongoose.model("User", userSchema)

async function encryptPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
    catch(err)
    {
        console.log(err)
    }
    
}




module.exports.encrypt = encryptPassword