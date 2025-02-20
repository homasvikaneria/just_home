
import express from 'express'
import { getAllContactus, postContactus } from '../Controller/ContactusController.js';
    
    const ContactusRouter = express.Router()

    ContactusRouter.get("/", getAllContactus)
    ContactusRouter.post("/", postContactus)
    
    export default ContactusRouter