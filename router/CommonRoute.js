const express = require('express')
const router = express.Router();

const commonController = require('../Controller/CommonController')


router.post('/register', commonController.registerUser);
router.post('/login', commonController.userLogin);
router.post('/verifyRef',commonController.verifyAdminRef);

module.exports = router;