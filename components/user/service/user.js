//user class
// Create a Contact App with following entities as per the UML given in the example:
// User , Contacts and Contact Details
// User will have two roles: Admin or Staff
// Following are the features for Admin:
// CRUD on users
// Following are the features for Staff:
// CRUD on Contact and Contact Details

// If an entity is deleted, the app sets the isActive flag to false
// If isActive flag of user is false; he/she cannot perform CRUD on any entities

const Contact = require("../../contact/service/contact");
const bcrypt = require("bcrypt");



class User{
    static ID = 0;
    static #AllAdmin = [];
    static #AllStaff = [];
    constructor(userID, username , firstName, lastName,password, isAdmin, isActive, contacts){
        this.userID = userID;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.contacts = contacts;
    }

    static  createAdmin(username , firstName , lastName , password){
        try {
            if(typeof firstName != "string"){
                throw new Error("firstname is invalid");
            }

            if(typeof lastName != "string"){
                throw new Error("lastname is invalid");
            }


            let tempAdmin = new User(++User.ID , username ,  firstName, lastName, password,  true , true , []);
            User.#AllAdmin.push(tempAdmin);
            return tempAdmin;
            
        } catch (error) {

            console.log(error);
            
        }
    }

     async createStaff(username ,firstName , lastName , password){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }

            if(typeof firstName != "string"){
                throw new Error("firstname is invalid");
            }

            if(typeof lastName != "string"){
                throw new Error("lastname is invalid");
            }

           const hashedPassword = await bcrypt.hash(password , 10);
        

            let tempStaff = new User(++User.ID,username, firstName, lastName, hashedPassword, false, true, []);
            User.#AllStaff.push(tempStaff);
            return tempStaff;
            
        } catch (error) { 
            console.log(error);
        }
    }

    //read
    //get All staff
    getAllStaff(){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }

            return User.#AllStaff.filter(user => user.isActive);

        } catch (error) {
            console.log(error);
        }
       
    }

    findAdminByusername(username){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }

            if(typeof username != "string"){
                throw new Error("username is invalid");
            }

            for(let i=0; i<User.#AllAdmin.length; i++){
                if(User.#AllAdmin[i].username == username){
                    return User.#AllAdmin[i];
                }
            }

            return null;
            
        } catch (error) {
            console.log(error);
        }
    }

    findUserByUsename(username){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }

            if(typeof username != "string"){
                throw new Error("username is invalid");
            }

            for(let i=0; i<User.#AllStaff.length; i++){
                if(User.#AllStaff[i].username == username){
                    return User.#AllStaff[i];
                }
            }

            return null;

        } catch (error) {
            
        }
    }

   
    //get staff by id
    getStaffById(id){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }

            
            if(id < 0){
                throw new Error("id should be greater than 0");
            }
            

            for(let i=0; i<User.#AllStaff.length; i++){
                if(User.#AllStaff[i].userID == id){
                    return User.#AllStaff[i];
                }
            }

            return null;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //update staff by id
    updateStaffById(id , parameterToUpdate , value){
       try {
        if(!this.isAdmin){
            throw new Error("user is not Admin")
        }
        if(!this.isActive){
            throw new Error("user is not active")
        }
          
        
        if(id < 0){
            throw new Error("id should be greater than 0");
        }
        

        let foundUser = this.getStaffById(id);

        switch(parameterToUpdate){
            case "firstName":
                foundUser.updateFirstName(value);
                break;
            case "lastName":
                foundUser.updateLastName(value);
                break;
            case "isAdmin":
                foundUser.updateIsAdmin(value);
                break;
            case "isActive":
                foundUser.updateIsActive(value);
                break;
            default:
                    throw new Error("parameter is invalid")
        }

        return foundUser;
        
       } catch (error) {
          console.log(error);
          return null;
       }

    }

    updateFirstName(value){
        try {

            if(typeof value != "string"){
                throw new Error("value is invalid")
            }

            this.firstName = value;

            
        } catch (error) {
            console.log(error);
        }
    }

    updateLastName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid");
            }
            this.lastName = value;
        } catch (error) {
            console.log(error);
        }
    }

    updateIsAdmin(value){
        try {
            if(typeof value != "boolean"){
                throw new Error("value is invalid")
            }
            this.isAdmin = value;
        } catch (error) {
            console.log(error);
        }
    }

    updateIsActive(value){
        try {
            if(typeof value != "boolean"){
                throw new Error("value is invalid")
            }
            this.isActive = value;
            
        } catch (error) {
            console.log(error);
        }
    }

    //delete by id
    deleteByid(id){
        try {
            if(!this.isAdmin){
                throw new Error("user is not Admin")
            }
            if(!this.isActive){
                throw new Error("user is not active")
            }
            if(typeof id != "number"){
                throw new Error("id id invalid");
            }
            if(id < 0){
                throw new Error("id should be greater than 0");
            }
            if(id > User.UserID){
                throw new Error("id does not exist");
            }
            let foundUser = this.getStaffById(id);
            foundUser.isActive = false;
        } catch (error) {

            console.log(error);
            
        }
    }

    static isActiveUser(userID){
        const foundUser = getStaffById(userID);
        if(foundUser.isActive){
            return true;
        }

        return false;
    }

    createContact(firstName , lastName){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contact")
            }
            if(!this.isActive){
                throw new Error("Inactive users cannot create contacts");
            }
            let newContact = Contact.createContact(firstName , lastName);
            this.contacts.push(newContact);
            return newContact;
        } catch (error) {

            console.log(error);
            
        }
    }

    getContactById(id){

       try {
        if(this.isAdmin){
            throw new Error("only staff can access the contact")
        }
        if(!this.isActive){
            throw new Error("user is not active")
        }
          
        if(typeof id != "number"){
            throw new Error("id id invalid");
        }
        if(id < 0){
            throw new Error("id should be greater than 0");
        }
        
        let allContacts = this.contacts;
        let reqContact;
        for(let i=0; i<allContacts.length; i++){
            if(allContacts[i].getContactID() == id){
                reqContact = allContacts[i];
                break;
            }
        }
        // let reqContact = Contact.getContactByUsingId(id , allContacts);
        return reqContact;
        
       } catch (error) {

        console.log(error);
        
       }

    }

    getAllContacts(){
        return this.contacts.filter(contact => contact.isActive)
    }

    updateContactByid(id , parameterToUpdate, value){
        try {
            
            let foundContact = this.getContactById(id);

            foundContact.updateContactByUsingId(parameterToUpdate , value);

            return foundContact;
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteContactById(id){
        try {
           

            let foundContact = this.getContactById(id);
            foundContact.deleteContactById();;

            
        } catch (error) {
            console.log(error);
            
        }
    }


    //create new contact details using staff Contact
    newContactDetails(contactID , number , email){
        try {

            let staffContact = this.getContactById(contactID);

            staffContact.newContactByDetails(number , email);
        } catch (error) {
            console.log(error);
        }
    }

    //get All contacts details
    getAllcontactDetails(contactID){

        try {
            if(this.isAdmin){
                throw new Error("only staff can access contact details")
            }
            if(!this.isActive){
                throw new Error("inActive user cannot create contact details");
            }
           
            let staffContact = this.getContactById(contactID);
            let reqContactDetails = staffContact.getAllcontactDetails();
            return reqContactDetails;
        } catch (error) {
            console.log(error);
            
        }

    }

    //get contact details by id using staff = staff -> 3 array (that contact id) -> contact - detals id
    getContactsDetailById(contactID , contactDetailsID){
        try {
            if(this.isAdmin){
                throw new Error("only staff can access contact details")
            }
            if(!this.isActive){
                throw new Error("inActive user cannot create contact details");
            }
            
            let staffContact = this.getContactById(contactID);
            
            let foundDetail = staffContact.getContactDetails(contactDetailsID);

            return foundDetail;

        } catch (error) {
            console.log(error);
        }
    }

    //update contact details = contact id => [] = conatctdetailsid = details to updatte
    upadeteContactDetailsById(contactID , contactDetailID, parameterToUpdate , value){
        try {
            if(this.isAdmin){
                throw new Error("only staff cannot update contact details")
            }
            if(!this.isActive){
                throw new Error("inActive user cannot update contact details");
            }
            

            let staffContact = this.getContactById(contactID);

            let updatedDetail = staffContact.getupdatedContactDetails(contactDetailID , parameterToUpdate , value);

            return updatedDetail;


            
        } catch (error) {
           console.log(error); 
        }

    }


    //delete contact details by using id - contactid ->  find that conatct array -> in that array find that specific contact details and remove from the array
    deleteContactDetailsByID(contactID , contactDetailsID){
        try {
            if(this.isAdmin){
                throw new Error("only staff can delete contact details")
            }
            if(!this.isActive){
                throw new Error("inActive user cannot delete contact details");
            }
            
            //find the contact 
            let staffContact = this.getContactById(contactID);
            staffContact.deleteContactDetails(contactDetailsID);
            
        } catch (error) {
            console.log(error);
        }

    }

    
}


module.exports = User;




