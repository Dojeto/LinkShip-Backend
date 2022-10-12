import { Router } from "express"
import bcrypt from 'bcrypt'
import db from '../models/schema.js'
import jwtClient from "../utils/jwtGenrator.js";

const router = Router();

router.post('/register', async(req,resp)=>{
    try {

        const { username , password } = req.body;
        const finduser = await db.find({
            username : username.toLowerCase(),
        })
        if(finduser != '')
        {
            return resp.status(401).json("User Already Exists")
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
    
        const bcryptPassword = await bcrypt.hash(password,salt);
    
        const newUser = await db.create({
            username : username.toLowerCase(),
            password : bcryptPassword
        })

        const token = jwtClient(newUser._id);

        resp.status(200).json({token})
        
    } catch (err) {
        console.log(err.message)
        resp.status(500).send("Server Error")
    }
})

router.post('/login',async(req,resp)=>{
    try {
        const { username , password } = req.body;
        const finduser = await db.find({
            username : username.toLowerCase(),
        })
        if(finduser == '')
        {
            return resp.status(401).json("User Dosen't Exists")
        }
        const validPass = await bcrypt.compare(password,finduser[0].password)
    
        if(!validPass)
        {
            return resp.status(401).json("Wrong Password");
        }
        const token = jwtClient(finduser[0]._id.toString());

        resp.status(200).json({token})
    } catch (err) {
        console.log(err.message)
        resp.status(500).json("Server Error")
    }
})

export default router;