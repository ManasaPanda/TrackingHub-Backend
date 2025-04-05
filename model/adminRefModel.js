const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');

const Admin = sequelize.define('AdminReferalCode', {
    referalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: 'referal_unique_constraint'
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}
    ,
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["referalCode"],
                name: "referal_unique_constraint" // ✅ Custom index name (prevents duplicates)
            }
        ]
    });


module.exports = Admin