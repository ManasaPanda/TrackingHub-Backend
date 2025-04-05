const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const configs = require('../db/config.json')


// exports.registerUser = async (req, res) => {
//     const { email, password, Name, Age, role = "user" } = req.body

//     if (!email || !password || !Name || !Age) {
//         return res.status(404).json({ message: "All Fields are Required!" });
//     }

//     try {
//         const user = await User.findOne({ where: { email } })
//         if (user)
//             return res.status(409).json({
//                 status: "Failed",
//                 message: `${email} Already Exist`
//             })

//         const hashpassword = await bcrypt.hash(password, 10)
        
//         const Salary = role == "admin" ? 50000 : 0;

//         const newUser = await User.create({
//             email,
//             password: hashpassword,
//             Salary,
//             Name,
//             Age,
//             role
//         })

//         return res.status(200).json({
//             status: "Success",
//             message: `${role} Registered Successfully`,
//             user: newUser
//         })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }


// exports.userLogin = async (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password)
//         return res.status(400).json({ message: "Email and password are required!" });

//     try {

//         const user = await User.findOne({ where: { email } })
//         if (!user)
//             return res.status(401).json({
//                 status: "failed",
//                 message: "User Not Found!"
//             })

//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if (!isPasswordValid)
//             return res.status(401).json({
//                 status: "failed",
//                 message: "Please Enter valid credentials!"
//             })

//         // Generate JWT Token with role
//         const token = jwt.sign(
//             { id: user.id, email: user.email, role: user.role },
//             configs.dev['SECRET_KEY '],
//             { expiresIn: '1h' }
//         );


//         return res.status(200).json({
//             status: "Success",
//             message: `login Successful as ${user.role}!`,
//             token: token,
//             details: user
//         })
//     } catch (error) {
//         return res.status(500).json({ status: "failed", message: "internal server error", error: error.message })
//     }
// }


exports.getAllUsers = async (req, res) => {
    try {
        const alluser = await User.findAll();


        res.status(200).json({ status: "Success", Users: alluser })
    } catch (error) {
        res.status(500).json({ status: "failed", error: error.message })
    }
}

exports.getUserById = async (req, res) => {
    const { Emp_id } = req.params
    if (!Emp_id)
        return res.status(400).json({ status: "failed", message: "Please Provided a Id" })
    try {
        const user = await User.findByPk(Emp_id)
        if (!user)
            return res.status(401).json({ status: "failed", message: "Enter a Valid Id" })
        return res.status(200).json({
            status: "success",
            message: "Retrive data Successfully!",
            details: user
        })
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message })
    }
}

exports.updateUser = async (req, res) => {
    const { Emp_id } = req.params
    const { Salary, Age, Name } = req.body
    if (!Emp_id)
        return res.status(400).json({ status: "failed", message: "Please Provide a ID" })

    try {
        const user = await User.findByPk(Emp_id)
        if (!user)
            return res.status(401).json({
                status: "failed",
                message: "User Not Found. Provide a Vaild Id!"
            })

        Int_Age = Number(Age)
        await user.update({
            Salary: Salary,
            Age: Int_Age,
            Name: Name
        })

        return res.status(200).json({
            status: "Success",
            message: "Update Successfully",
            user: user
        })

    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    const { Emp_id } = req.params
    if (!Emp_id)
        return res.status(401).json({ status: "failed", message: "Please provided a ID" })

    try {
        const user = await User.findByPk(Emp_id)
        if (!user)
            return res.status(401).json({ status: "failed", message: "User Not Found. Provide a Vaild ID" })

        await user.destroy()

        return res.status(200).json({ status: "success", message: "Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message })
    }
}