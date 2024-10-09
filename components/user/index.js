const express = require('express')
const { getAllUsers, createUser, getUser, deleteUser, updateUser } = require('./controller/user')
const contactRouter = require('../contact')
const { verifyAdmin, verifyStaff } = require('../../middlewares/authorization')

// const {contactRouter} = require("../contact/index")
const userRouter = express.Router()
//api/v1/contact-app/user/
// userRouter.use(verifyAdmin);
userRouter.get('/',verifyAdmin , getAllUsers)// /api/v1/contact-app/user/
userRouter.get('/:id' , verifyAdmin ,  getUser)
userRouter.post('/' , verifyAdmin ,createUser)
userRouter.put('/:id' ,verifyAdmin ,  updateUser)
userRouter.delete('/:id' ,verifyAdmin ,  deleteUser)

userRouter.use("/:userID/contact", verifyStaff, contactRouter);

module.exports = userRouter