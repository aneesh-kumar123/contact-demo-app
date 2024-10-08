const express = require("express");
const {createContact,getContactByID,updateContactByID,deleteContactByID,getAllContactsOfUser} = require("./controller/contact");
const contactDetailsRouter = require("../contactDetails");

const contactRouter = express.Router({ mergeParams: true });

//create contact 

contactRouter.post("/", createContact);

contactRouter.get("/:contactID", getContactByID);

//get all contacts of r user
contactRouter.get("/", getAllContactsOfUser);

contactRouter.put("/:contactID", updateContactByID);

contactRouter.delete("/:contactID", deleteContactByID);

contactRouter.use("/:contactID/contactDetails", contactDetailsRouter);
module.exports = contactRouter;