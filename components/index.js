const express = require('express')
const userRouter = require('./user/index') 
const router = express();
const cookieParser = require('cookie-parser')
// const secrateKey = 'ascvyudhaijkms'
// const jwt = require('jsonwebtoken');
const User = require('./user/service/user')

const bcrypt = require("bcrypt");
const { Payload} = require('../middlewares/authorization')

router.use(cookieParser())

let Admin = User.createAdmin("ajinkya_bhagat", "Ajinkya", "bhagat", "12345");
//ignore
router.post('/loginAdmin' , async (req , res) => {
    try {
        
        let { username, password } = req.body
        //validation
        if(typeof username != "string"){
            throw new Error("username is invalid")
        }
    
        if(typeof password != "string"){
            throw new Error("password is invalid")
        }

       
        const admin = Admin.findAdminByusername(username);

        if(!admin){
            throw new Error("admin does not exist");
        }

        if((password === admin.password)){
            let payload = Payload.newPayload(admin.userID , admin.isAdmin);
            let token = payload.signPayload();
            //send cookie
            res.cookie("auth", `Bearer ${token}`)
            //send into header
            res.set("auth", `Bearer ${token}`)
            res.status(200).send(token)
        }else{
            res.status(403).json({
                message : "password incorrect"
            })
        }


    
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
    let { username, password } = req.body
    //validation
    if(typeof username != "string"){
        throw new Error("username is invalid")
    }

    if(typeof password != "string"){
        throw new Error("password is invalid")
    }

    //const Admin = await createAdmin();
    //logic to check username and password
    const user = Admin.findUserByUsename(username);

    if(!user){
        throw new Error("user does not exist");
    }

    if(await bcrypt.compare(password , user.password)){
        let payload = Payload.newPayload(user.userID , user.isAdmin);
        let token = payload.signPayload();
        //send cookie
        res.cookie("auth", `Bearer ${token}`)
        //send into header
        res.set("auth", `Bearer ${token}`)
        res.status(200).send(token)
    }else{
        res.status(403).json({
            message : "password incorrect"
        })
    }
    
    } catch (error) {
        console.log(error);
    }
})



router.use('/user',userRouter) // api/v1/contact-app/user/:id/contact/



module.exports =router;