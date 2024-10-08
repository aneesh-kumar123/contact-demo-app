

class ContactDetails{
    constructor(contactDetailID , number , email){
        this.contactDetailID = contactDetailID;
        this.number = number;
        this.email = email;
    }

    //getter id
    getContactDetailID(){
        return this.contactDetailID;
    }


    static newContactDetail(contactDetailID , number , email){
        try {
            if(typeof contactDetailID != "number"){
                throw new Error("contactdetail id is invalid")
            }
    
            if(contactDetailID < 0){
                throw new Error("contactDetail id should greater than 0")
            }
    
            if(typeof number != "number"){
                throw new Error("invalid number")
            }
    
            if(typeof email != "string"){
                throw new Error("invalid email");
            }
    
    
            let newContact = new ContactDetails(contactDetailID , number , email);
            
            return newContact;
    
        } catch (error) {
            throw error;
        }
        

    }

    
    updateDetails(parameterToUpdate , value){
        try {
            if(typeof parameterToUpdate != "string"){
                throw new Error("parameter is invalid")
            }
            switch(parameterToUpdate){
                case "number":
                    this.updateNumber(value);
                    break;
                case "email":
                    this.updateEmail(value);
                    break;
                default:
                    throw new Error("parametr is invalid");
            }
            return this;
        } catch (error) {
            throw error;
        }
    }

    updateNumber(value){
       try {
         if(typeof value != "number"){
            throw new Error("value is invalid");
         }
         this.number = value;
       } catch (error) {
         throw error;
       }
    }

    updateEmail(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid");
             }

             this.email = value;
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContactDetails;