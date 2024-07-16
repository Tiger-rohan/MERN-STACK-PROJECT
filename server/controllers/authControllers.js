const User = require('../models/user');
const {hashPassword,comparePassword} = require('../helpers/auth');
const jwt =require('jsonwebtoken');


const test =(req,res) =>{
    res.json("testing server")
    
}
//register endpoint
const registerUser = async (req,res) =>{
try{
    const {name,email,password, role} = req.body;
    //check if user exists
    if(!name){
        return res.json({
            error:"Name is required"
        })
    }
    //check if password is good
    if(!password || password.length < 6){
        return res.json({
            error:"Password is required and should be 6 characters long"
        })
    };
    const exist = await User.findOne({email});
    if(exist){
        return res.json({
            error:"Email is already taken"
        })
    }

    const hashedPassword = await hashPassword(password)
        const user = await User.create({name,email,password:hashedPassword,role
        })
        return res.json(user)
    }


catch(error){
    console.log(error)
}
};

//login endpoint

const loginUser = async (req,res) =>{
try{
    const {email,password, role} = req.body;
    const user =await User.findOne({email});
    if(!user){
        return res.json({
            error:"No user found"
})
    }
    //check if password match
    const match = await comparePassword(password,user.password)
    if(match){
        jwt.sign({email:user.email, id:user._id, name: user.name},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
        })
    }
    if(!match){
        res.json({error:"Wrong Password"})
    }
}catch(error){
    console.log(error)
}

}


// const getProfile = (req,res) =>{

//     const {token} = req.cookies;
//     if(token){
//         jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
//             if(err) throw err;
//             res.json(user)
//             console.log(user)
//         })
//     } else{
//         res.json(null)
//     }

// }
const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ msg: 'Token is not valid' });
            }
            try {
                const user = await User.findById(decodedToken.id).select('-password'); // Exclude password from the response
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.json(user);
                console.log(user);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server error');
            }
        });
    } else {
        res.json(null);
    }
};


module.exports={test,registerUser,loginUser,getProfile}
