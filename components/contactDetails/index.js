const express = require("express");
const {createContactDetails, getContactDetailsByID,updateContactDetailsByID, deleteContactDetailsByID, getAllContactDetailsOfUser} = require("./controller/contactDetails");
const contactDetailsRouter = express.Router({ mergeParams: true });


//create contact details of user contact
contactDetailsRouter.post("/", createContactDetails);

contactDetailsRouter.get("/:cdID", getContactDetailsByID);

//update
contactDetailsRouter.put("/:cdID", updateContactDetailsByID);

//delete 
contactDetailsRouter.delete("/:cdID", deleteContactDetailsByID);


contactDetailsRouter.get("/", getAllContactDetailsOfUser);

module.exports = contactDetailsRouter;