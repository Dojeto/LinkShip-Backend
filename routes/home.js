import { Router } from "express";

const router = Router();

router.get('/',(req,resp)=>{
    resp.send("Welcome to the LinkPeti backend");
})

export default router