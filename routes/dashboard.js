import { Router } from "express";
import auth from "../middleware/authorization.js";
import db from '../models/schema.js'

const router = Router();

router.get('/', auth ,async(req,resp)=>{
    try {
        const user = await db.findById(req.user);
        resp.status(200).json(user.username);
    } catch (err) {
        console.log(err.message)
        resp.status(500).json("Server error");
    }
})

export default router;