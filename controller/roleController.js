const { Role } = require("../models/Role")


module.exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        
        res.status(200).send({ data: roles })
    }

    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.createRole = async (req, res) => {

    try {
    
        
        let role = new Role({
            role: req.body.role.trim().toLowerCase()
        })
        await role.save()

        console.log(req.files)
        res.status(200).send({ "message": "Role added", role })

    }
    catch (err) { res.status(400).send({ error: "Something went wrong", err }) }
}

module.exports.editRole = async (req, res) => {

    try {
        
        let role = await Role.findById(req.params.id)
        role.role = req.body.role.trim().toLowerCase()
        await role.save()
        res.status(200).send({ message: "Role Updated Successfully" })

    }
    catch (err) { res.status(400).send({ error: "Something went wrong" ,err}) }
}

module.exports.deleteRole = async (req, res) => {
    try {

        await Role.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({ message: "Deleted Successfully" })

    }
    catch (error) {
        res.send({
            error: "Something went wrong",
            err
        })
    }
}