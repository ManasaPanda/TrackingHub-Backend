const User = require('../model/userModel')
const AdminRef = require('../model/adminRefModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const configs = require('../db/config.json')


exports.registerUser = async (req, res) => {
    const { email, password, Name, Age, isAdmin } = req.body

    console.log(email, password, Name, Age, isAdmin);

    if (!email || !password || !Name || !Age) {
        return res.status(401).json({ status: "failed", message: "All Fields are Required!" });
    }

    try {
        const user = await User.findOne({ where: { email } })
        if (user)
            return res.status(409).json({
                status: "Failed",
                message: `Accound with ${email} is already exist `
            })

        const hashpassword = await bcrypt.hash(password, 10)

        const role = isAdmin ? "admin" : "user"

        const Salary = role == "admin" ? 50000 : 0;

        const newUser = await User.create({
            email,
            password: hashpassword,
            Salary,
            Name,
            Age,
            role
        })

        return res.status(200).json({
            status: "Success",
            message: `${role} Registered Successfully`,
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}


exports.userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required!" });

    try {

        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(401).json({
                status: "failed",
                message: "User Not Found!"
            })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                message: "Please Enter valid credentials!"
            })

        // Generate JWT Token with role
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            configs.dev['SECRET_KEY '],
            { expiresIn: '1h' }
        );


        return res.status(200).json({
            status: "Success",
            message: `login Successful as ${user.role}!`,
            token: token,
            details: user
        })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "internal server error", error: error.message })
    }
}


exports.verifyAdminRef = async (req, res) => {
    const { referalCode } = req.body
    console.log(referalCode);
    
    if (!referalCode)
        return res.status(401).json({ status: "failed", message: "Admin Referal Code Required!" });

    try {
        const adminref = await AdminRef.findOne({
            where: {
                referalCode
            }
        })

        if (!adminref)
            return res.status(401).json({ status: "failed", message: "please Enter a valid Code." })

        if(adminref.used == true)
            return res.status(401).json({status:"failed",message:"Referral code is valid for one-time use only or has already been used."})

        await adminref.update({
            used:true
        })

        return res.status(200).json({
            status: "success",
            message: "referal Code verified Successfully."
        })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}