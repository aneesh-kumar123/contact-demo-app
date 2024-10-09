
const badRequest = require("../../../errors/badRequest.js");
const NotFoundError = require("../../../errors/notFoundError.js");
const Logger = require("../../../utils/logger.js");
const User = require("../service/user.js");




const getAllUsers = async (req,res , next)=>{
    try {
        Logger.info("getAllUser called")
        let Admin =  User.AllAdmin[0];
        const users = Admin.getAllStaff();
        if(!users){
            throw new NotFoundError("users not found");
        }
        Logger.info("getAllUser controller ended")
        res.status(201).json(users);

    } catch (error) {
        next(error);
    }
}

const createUser = async (req , res , next) => {
    try {
        Logger.info("createUser called")
        const {username , firstName , lastName , password} = req.body;

        if(typeof username != "string"){
            throw new badRequest("invalid username..")
        }

        if(typeof firstName != "string"){
            throw new badRequest("invalid firstname ...")
        }

        if(typeof lastName != "string"){
            throw new badRequest("invalid lastname..")
        }

        let Admin = User.AllAdmin[0];
        
        
        const newUser =  await Admin.createStaff(username , firstName , lastName , password);
        

        if(!newUser){
            throw new badRequest("user could not created");
        }
        
        Logger.info("createUser controller ended")
        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
}

const getUser =  (req , res , next) =>{
    try {
        Logger.info("getuser called")
        const {id} = req.params;
        if(isNaN(Number(id))){
            throw new badRequest("invalid userid..");
        }
        let Admin =  User.AllAdmin[0];
        const user = Admin.getStaffById(id);

        if(!user){
            throw new NotFoundError("users not found");
        }
        Logger.info("getUser controller ended")
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

const deleteUser = (req , res , next) =>{
    try {
        Logger.info("deleteUser called")
        const id = parseInt(req.params.id);;
        if (typeof id != "number"){
            throw new badRequest("invalid user id...");
        }
        let Admin =  User.AllAdmin[0];
        Admin.deleteByid(id);
        Logger.info("deleteUser controller Ended");
        res.status(201).json("user deleted succesfully");
    } catch (error) {
        next(error);
    }
}

const updateUser =  (req , res , next) =>{
    try {
        Logger.info("updateUser called");
        const {id} = req.params;
        if(isNaN(Number(id))){
            throw new badRequest("invalid user id...");
        }
        const {parameter , value} = req.body;
        
        if(typeof parameter != "string"){
            throw new badRequest("invalid parameter");
        }

        let Admin =  User.AllAdmin[0];
        const updatedUser = Admin.updateStaffById(id , parameter , value);
        if(!updatedUser){
            throw new NotFoundError("users not found");
        }
        Logger.info("updateUser controller ended")
        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
}



module.exports={getAllUsers , createUser , getUser , deleteUser , updateUser}