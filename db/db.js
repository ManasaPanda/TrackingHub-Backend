const mysql = require('mysql2')
const Sequelize = require('sequelize')
const configs = require('./config.json')


const sequelize = new Sequelize(configs.dev.MYSQLDB, configs.dev.MYSQLDB_USER, configs.dev.MYSQLDB_PASS, {
    host: configs.dev.MYSQLDB_HOST,
    dialect: 'mysql'
});


sequelize.authenticate()
    .then(()=>console.log("Database Connceted Successfully")
    )
    .catch(err => console.log('Database Connection Error: ',err.message)
    )



module.exports = sequelize


// //local mysql db connection
// const connection = mysql.createPool({
//     connectionLimit : configs.dev.POOL_SIZE,
//     host     : configs.dev.MYSQLDB_HOST,
//     user     : configs.dev.MYSQLDB_USER,
//     password : configs.dev.MYSQLDB_PASS,
//     database : configs.dev.MYSQLDB,
//     multipleStatements: true
// });

// connection.getConnection((err,connect)=>{
//     if (!err) {
//         console.log('DB Connection Succeded. The connection ID is:',
//             + connect.threadId);
//     } else {
//         console.log('DB Connection failed! Reason:',
//             +JSON.stringify(err)
//         );
        
//     }
// })

// module.exports = connection;
