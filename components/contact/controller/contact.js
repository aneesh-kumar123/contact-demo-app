const User = require("../../user/service/user");

let Admin = User.createAdmin("ajinkya_bhagat", "Ajinkya", "bhagat", "12345");


//post
const createContact = (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userID = parseInt(req.params.userID);

    if (typeof userID != "number") {
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }
    if (typeof firstName != "string") {
        throw new Error("invalid first name");
    }

    if (typeof lastName != "string"){
        throw new Error("invalid last name");
    }

    if (firstName === lastName){
        throw new Error("invalid first name and last name!");
    }
    console.log(Admin);
   let user = Admin.getStaffById(userID);
   console.log(user);
    //console.log(user);
    const contact = user.createContact(firstName, lastName);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};

//get all user contacts
const getAllContactsOfUser = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    if (typeof userID != "number") {
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }
    console.log(Admin);
    let allContacts = Admin.getAllContact(userID);
    res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};


//get contact by id
const getContactByID = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number") {
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    let user = Admin.getStaffById(userID);

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }
   
   const contact = user.getContactById(contactID);

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};

const updateContactByID = (req, res) => {
  try {
    const { parameter, value } = req.body;
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);

    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    let user = Admin.getStaffByI(userID);
    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
      
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }
   
    if (typeof parameter != "string"){
        throw new Error("invalid parameter type...");
    }


    const updatedContact = user.updateContactByid(contactID , parameter,value);
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const deleteContactByID = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    let user = Admin.getStaffByI(userID);
    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
      
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }
   
    if (typeof parameter != "string"){
        throw new Error("invalid parameter type...");
    }

    user.deleteContactById(contactID)

    res.status(200).json({message: `Contact with ID ${contactID} has been deleted successfully...`,});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {createContact,getContactByID,updateContactByID,deleteContactByID,getAllContactsOfUser,};