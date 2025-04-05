const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');


const User = sequelize.define('User', {
    Emp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email_unique_constraint"
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Salary: {
        type: DataTypes.BIGINT
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'), // ✅ Role field
        allowNull: false,
        defaultValue: 'user'
    }
},
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["email"],
                name: "email_unique_constraint" // ✅ Custom index name (prevents duplicates)
            }
        ]
    }
)

module.exports = User