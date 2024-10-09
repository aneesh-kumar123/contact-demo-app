//user class
const contact_Details = require("../../contactDetails/service/contactDetails.js")


class Contact{
    static contactID = 0;
    static #allContacts = [];

    getContactID(){
        return this.contactID;
    }


    constructor(contactID, firstName, lastName, isActive, contactDetails) {
        this.contactID = contactID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.contactDetails = contactDetails;
    }

    static createContact(firstName, lastName) {
        try {
            
            if (typeof firstName !== "string") {
                throw new Error("First name is invalid");
            }

            if (typeof lastName !== "string") {
                throw new Error("Last name is invalid");
            }

            let newContact = new Contact(++Contact.contactID, firstName, lastName, true, []);
            Contact.#allContacts.push(newContact);
            return newContact;

        } catch (error) {
            throw error;
        }
    }



    updateContactByUsingId(parameterToUpdate , value ){
       try {
        switch(parameterToUpdate){
            case "firstName":
                this.upadateFirstName(value);
                break;
            case "lastName":
                this.updateLastNmae(value);
                break;
            case "isActive":
                this.updateIsActive(value);
                break;
            default:
                throw new Error("parameter is invalid")
        }
       } catch (error) {
         throw error;
       }
    }

    upadateFirstName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.firstName = value;
        } catch (error) {
            throw error;
        }
    }

    updateLastNmae(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.lastName = value;
        } catch (error) {
            throw error;
        }
    }

    updateIsActive(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.isActive = value;
        } catch (error) {
            throw error;
        }
    }

    static getAllContacts(userID) {
        return Contact.#allContacts.filter(contact => contact.userID === userID && contact.isActive);
    }

    deleteContactById(){
        try {
            this.isActive = false;
        } catch (error) {
            throw error;
        }
    }

    newContactByDetails(number , email){

        try {

            let contactDetailsID = this.contactDetails.length;

       
           let newContactDetail = contact_Details.newContactDetail(++contactDetailsID , number , email);
           this.contactDetails.push(newContactDetail);

        } catch (error) {
            throw error;
        }
        
    }

    getAllcontactDetails(){
        return this.contactDetails;
    }

    getContactDetails(contactDetailID){
        try {

            if(typeof contactDetailID != "number"){
                throw new Error("contact Details id is invalid");
            }
            
            if(contactDetailID < 0){
                throw new Error("contact details id must be greater than 0");
            }
            
            let foundDetail;
            for(let i=0; i<this.contactDetails.length; i++){
                if(this.contactDetails[i].getContactDetailID() === contactDetailID){
                    foundDetail = this.contactDetails[i];
                    break;
                }
            }
            
            //let foundDetail = contact_Details.getContactDetails(contactDetailID ,AllContactDetails);

            return foundDetail;
            
        } catch (error) {
            throw error;
        }
    }

    getupdatedContactDetails(contactDetailID , parameterToUpdate , value){
        try {
            if(typeof contactDetailID != "number"){
                throw new Error("contact Details id is invalid");
            }
            
            if(contactDetailID < 0){
                throw new Error("contact details id must be greater than 0");
            }

            if(contactDetailID > this.contactDetails.length){
                throw new Error("id does not exist");
            }

            let reqDetail = this.getContactDetails(contactDetailID);
            reqDetail.updateDetails(parameterToUpdate , value);
            return reqDetail;

            
        } catch (error) {
            throw error;
        }

    }

    deleteContactDetails(contactDetailID){
        try {
            if(typeof contactDetailID != "number"){
                throw new Error("contact Details id is invalid");
            }
            
            if(contactDetailID < 0){
                throw new Error("contact details id must be greater than 0");
            }


            
            this.contactDetails = this.contactDetails.filter(contactDetail => contactDetail.getContactDetailID() != contactDetailID);
            
        } catch (error) {
           throw error; 
        }
    }


}


module.exports = Contact;