import { Router } from "express";

const router = Router();

router.get('/',(req,resp)=>{
    resp.send("Welcome to the LinkShip backend");
})

export default router