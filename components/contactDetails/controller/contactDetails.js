const User = require("../../user/service/user.js");

//post
const createContactDetails = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }

    const { number, email } = req.body;

    let Admin =  User.AllAdmin[0];

    let user = Admin.getStaffById(userID);

     const contactDetail = user.newContactDetails(contactID, number, email);
    res.status(201).json(contactDetail);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};

//get all contact details
const getAllContactDetailsOfUser = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }

    let Admin =  User.AllAdmin[0];

    let user = Admin.getStaffById(userID);

    let allContactDetails = user.getAllcontactDetails(contactID);
   
    res.status(200).json(allContactDetails);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};

//get contact details by id
const getContactDetailsByID = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    const cdID = parseInt(req.params.cdID);
    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }

    if (cdID < 0){
        throw new Error("invalid contact id!");
    }
    let Admin =  User.AllAdmin[0];
    let user = Admin.getStaffById(userID);

    const contactDetail = user.getContactsDetailById(contactID, cdID);
    console.log(contactDetail);
    res.status(200).json(contactDetail);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};

//update contact details
const updateContactDetailsByID = (req, res) => {
  try {
    const { parameter, value } = req.body;
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    const cdID = parseInt(req.params.cdID);

    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }

    if (cdID < 0){
        throw new Error("invalid contact id!");
    }

    if (typeof parameter != "string"){
        throw new Error("invalid parameter type...");
    }

    let Admin =  User.AllAdmin[0];

    let user = Admin.getStaffById(userID);

    const updatedContactDetail = user.upadeteContactDetailsById(contactID,cdID,parameter,value);
    if (updatedContactDetail == null){
        throw new Error("Contact not found or updation failed...");
    }
    res.status(200).json(updatedContactDetail);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const deleteContactDetailsByID = (req, res) => {
  try {
    const userID = parseInt(req.params.userID);
    const contactID = parseInt(req.params.contactID);
    const cdID = parseInt(req.params.cdID);

    if (typeof userID != "number"){
        throw new Error("invalid user id...");
    }
    if (userID < 0){
        throw new Error("invalid user id!");
    }

    if (typeof contactID != "number"){
        throw new Error("invalid contact id type...");
    }
    if (contactID < 0){
        throw new Error("invalid contact id!");
    }

    if (cdID < 0){
        throw new Error("invalid contact id!");
    }

    let Admin =  User.AllAdmin[0];
    //console.log(Admin);
    let user = Admin.getStaffById(userID);
    //console.log(user);
    user.deleteContactDetailsByID(contactID, cdID);
   
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {createContactDetails,getContactDetailsByID,updateContactDetailsByID,deleteContactDetailsByID,getAllContactDetailsOfUser,};