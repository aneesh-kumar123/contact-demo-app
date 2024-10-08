
const User = require("../service/user.js");


let Admin =  User.createAdmin("ajinkya_bhagat", "Ajinkya", "bhagat", "12345");

const getAllUsers = (req,res)=>{
    try {
        const users = Admin.getAllStaff();
        if(!users){
            throw new Error("users not found");
        }

        res.status(201).json(users);

    } catch (error) {
        console.log(error);
    }
}

const createUser = async (req , res) => {
    try {
        const {username , firstName , lastName , password} = req.body;
        
        
        const newUser =  await Admin.createStaff(username , firstName , lastName , password);
        

        if(!newUser){
            throw new Error("user could not created");
        }
        
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
    }
}

const getUser = (req , res) =>{
    try {
        const {id} = req.params;
        if(isNaN(Number(id))){
            throw new Error("INVALID USER ID");
        }
        const user = Admin.getStaffById(id);

        if(!user){
            throw new Error("user not found")
        }
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = (req , res) =>{
    try {
        const id = parseInt(req.params.id);;
        if (typeof id != "number"){
            throw new Error("invalid user id...");
        }
        Admin.deleteByid(id);
        res.status(201).json("user deleted succesfully");
    } catch (error) {
        console.log(error);
    }
}

const updateUser = (req , res) =>{
    try {
        const {id} = req.params;
        if(isNaN(Number(id))){
            throw new Error("INVALID USER ID");
        }
        const {parameter , value} = req.body;
        const updatedUser = Admin.updateStaffById(id , parameter , value);
        if(!updatedUser){
            throw new Error("user not found");
        }
        res.status(201).json(updatedUser);
    } catch (error) {
        console.log(error);
    }
}

const getContacts = (req , res) => {
    try {
        const {userID} = req.params;
        if(isNaN(Number(userID))){
            throw new Error("INVALID USER ID");
        }
        const user = Admin.getStaffById(userID);
        const contact = user.getAllContacts();
        if(!contact){
            throw new Error("user not found");
        }
        res.status(201).json(contact);
    } catch (error) {
        console.log(error);
    }
}


module.exports={getAllUsers , createUser , getUser , deleteUser , updateUser , getContacts}