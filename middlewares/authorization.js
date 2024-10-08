const jwt = require('jsonwebtoken')
// const UnAuthorizedError = require('../errors/unAuthorizedError')
const secrateKey = 'ascvyudhaijkms'

const verifyAdmin = (req, res, next) => {
    try {
        
        console.log("verifyAdmin started")
        if (!req.cookies['auth'] && !req.headers['Auth']) {
            throw new Error("Cookie Not Found")
        }
        //token??
        let token = req.cookies['auth'].split(" ")[2];
        
       
        let payload = Payload.verifyToken(token);

        console.log(payload);
        
        if (!payload.isAdmin) {
            throw new Error("jhjgj")
        }
        console.log("verifyAdmin ended")
        console.log("next called")
        next();
    } catch (error) {
        next(error)
    }
}
const verifyStaff = (req, res, next) => {
    try {
        console.log("verifystaff started")
        if (!req.cookies['auth'] && !req.headers['auth']) {
            throw new Error()
        }
        //token??
        let token = req.cookies['auth'].split(" ")[2];
        let payload = Payload.verifyToken(token);
        if (payload.isAdmin) {
            throw new Error("Admin cant do this oprations , only user can do...")
        }
        console.log("verifystaff ended")
        console.log("next called")
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// const newPayload = () => {
//     return Payload.newPayload()
// }

class Payload {
    constructor(id , isAdmin) {
        this.id = id;
       
        this.isAdmin = isAdmin;
    }
    static newPayload(id  , isAdmin) {
        try {
            return new Payload(id , isAdmin);
        } catch (error) {
            throw error;
        }
    }
    
    signPayload() {
       try {
        return `Bearer ${jwt.sign({
            id: this.id,
            isAdmin: this.isAdmin
        }, secrateKey, {
            expiresIn: '10hr'
        })}`
       } catch (error) {
        console.log(error);
       }
    }

    static verifyToken(token) {
        //remove Bearer
        let payload = jwt.verify(token, secrateKey)
        return payload;

    }

}
module.exports = { Payload , verifyAdmin , verifyStaff }
