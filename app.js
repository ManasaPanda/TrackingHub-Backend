const configs = require('./db/config.json')
const sequelize = require('./db/db')
const userRoute = require('./router/UserRoute')
const commonroute = require('./router/CommonRoute')
const express = require('express')
const cors = require('cors')
const server = express()
server.use(express.json());
server.use(cors());

PORT = configs.dev.PORT || 3000;

server.use('/user',userRoute);
server.use('/auth',commonroute);


sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));


server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    
})