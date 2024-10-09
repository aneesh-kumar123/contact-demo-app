const express = require('express')
const userRouter = require('./user/index') 
const router = express();
const cookieParser = require('cookie-parser')
// const secrateKey = 'ascvyudhaijkms'
// const jwt = require('jsonwebtoken');
const User = require('./user/service/user')

const bcrypt = require("bcrypt");
const { Payload} = require('../middlewares/authorization');
const NotFoundError = require('../errors/notFoundError');
const badRequest = require('../errors/badRequest');


router.use(cookieParser());


let Admin;
router.post('/createAdmin' , async (req , res , next) => {
    try {
        Admin = await User.createAdmin("ajinkya_bhagat", "Ajinkya", "Bhagat", "12345");
        res.status(200).json(Admin)
    } catch (error) {
       next(error);
    }
})

// const creatAdmin = async () => {
//     try {
//         Admin = await User.createAdmin("ajinkya_bhagat", "Ajinkya", "Bhagat", "12345");
//         //res.status(200).json(Admin)
//         console.log(Admin);
//     } catch (error) {
//        //next(error);
//     }
// }

// creatAdmin();

// console.log(Admin , "hsdhjdhs");






router.post('/login', async (req, res , next) => {
  
    try {
    let { username, password } = req.body
    //validation
    if(typeof username != "string"){
        throw new badRequest("username is invalid")
    }

    if(typeof password != "string"){
        throw new badRequest("password is invalid")
    }

    //const Admin = await createAdmin();
    //logic to check username and password
  
    
    const user =  Admin.findUser(username);

    if(!user){
        throw new NotFoundError("user does not exist");
    }

    if(await bcrypt.compare(password , user.password)){
        let payload = Payload.newPayload(user.userID , user.isAdmin);
        let token = payload.signPayload();
        //send cookie
        res.cookie("auth", `Bearer ${token}`);
        //send into header
        res.set("auth", `Bearer ${token}`)
        res.status(200).send(token)
    }else{
        res.status(403).json({
            message : "password incorrect"
        })
    }
    
    } catch (error) {
        next(error);
    }
})



router.use('/user',userRouter) // api/v1/contact-app/user/:id/contact/



module.exports =router;