const express =require('express');
const router =express.Router();
const cors = require('cors');
const {test,registerUser,loginUser, getUsers} = require('../controllers/authControllers');


router.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

router.get('/',test);
router.post('/register',registerUser);
router.post('/login',loginUser);
// router.get('/profile',getProfile);
router.get('/users', getUsers);

module.exports = router;