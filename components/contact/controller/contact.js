const badRequest = require("../../../errors/badRequest");
const NotFoundError = require("../../../errors/notFoundError");
const Logger = require("../../../utils/logger");
const User = require("../../user/service/user");




//post
const createContact =  (req, res , next) => {
  try {
    Logger.info("createContact called")
    const { firstName, lastName } = req.body;
    const userID = parseInt(req.params.userID);
 
    if (typeof userID != "number") {
        throw new badRequest("invalid user id...");
    }
    if (userID < 0){
        throw new badRequest("invalid user id!");
    }
    if (typeof firstName != "string") {
        throw new badRequest("invalid first name");
    }

    if (typeof lastName != "string"){
        throw new badRequest("invalid last name");
    }

    if (firstName === lastName){
        throw new Error("invalid first name and last name!");
    }
    
    let Admin =  User.AllAdmin[0];


   let user = Admin.getStaffById(userID);

   if(!user){
     throw new NotFoundError("user not found")
   }
  
    //console.log(user);
    const contact = user.createContact(firstName, lastName);
    Logger.info("createContact controller ended")
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

//get all user contacts
const getAllContactsOfUser =  (req, res , next) => {
  try {
    Logger.info("getAllContactsOfUser called");
    const userID = parseInt(req.params.userID);
    if (typeof userID != "number") {
        throw new badRequest("invalid user id...");
    }
    if (userID < 0){
        throw new badRequest("invalid user id!");
    }
    let Admin =  User.AllAdmin[0];
    
    let user = Admin.getStaffById(userID);
    if(!user){
      throw new NotFoundError("user not found")
    }
    let contacts = user.getAllContacts()
    Logger.info("getAllContactsOfUser controller ended.");
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};


//get contact by id
const getContactByID =  (req, res , next) => {
  try {
    Logger.info("getContactByID called");
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number") {
        throw new badRequest("invalid user id...");
    }
    if (userID < 0){
        throw new badRequest("invalid user id!");
    }

    let Admin = User.AllAdmin[0];

    let user = Admin.getStaffById(userID);

    if(!user){
      throw new NotFoundError("user not found")
    }

    if (typeof contactID != "number"){
        throw new badRequest("invalid contact id type...");
    }
    if (contactID < 0){
        throw new badRequest("invalid contact id!");
    }
   
    const contact = user.getContactById(contactID);
    if(!contact){
      throw new NotFoundError("contact not found..")
    }
    Logger.info("getContactByID controller ended.");
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContactByID =  (req, res , next) => {
  try {
    Logger.info("updateContactByID called");
    const { parameter, value } = req.body;
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);

    if (typeof userID != "number"){
        throw new badRequest("invalid user id...");
    }
    if (userID < 0){
        throw new badRequest("invalid user id!");
    }

    let Admin =  User.AllAdmin[0];

    let user = Admin.getStaffByI(userID);

    if(!user){
      throw new NotFoundError("user not found")
    }

    if (typeof contactID != "number"){
        throw new badRequest("invalid contact id type...");
    }
      
    if (contactID < 0){
        throw new badRequest("invalid contact id!");
    }
   
    if (typeof parameter != "string"){
        throw new badRequest("invalid parameter type...");
    }


    const updatedContact = user.updateContactByid(contactID , parameter,value);
    Logger.info("updateContactByID controller ended");
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactByID = (req, res , next) => {
  try {
    Logger.info("deleteContactByID called");
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number"){
        throw new badRequest("invalid user id...");
    }
    if (userID < 0){
        throw new badRequest("invalid user id!");
    }

    let Admin =  User.AllAdmin[0];

    let user = Admin.getStaffById(userID);

    if(!user){
      throw new NotFoundError("user not found")
    }

    if (typeof contactID != "number"){
        throw new badRequest("invalid contact id type...");
    }
      
    if (contactID < 0){
        throw new badRequest("invalid contact id!");
    }

    user.deleteContactById(contactID)
    Logger.info("deleteContactByID called");
    res.status(200).json({message: `Contact with ID ${contactID} has been deleted successfully...`,});
  } catch (error) {
    next(error);
  }
};

module.exports = {createContact,getContactByID,updateContactByID,deleteContactByID,getAllContactsOfUser,};