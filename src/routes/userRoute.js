import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = Router()



// Only admin can accss this route
    router.get("/admin",verifyToken, authorizeRole("admin"),(req,res)=>{
        res.json({message:"Welcome Admin"})
    }) 

// Both admin and manager can access this route
    router.get("/manager",verifyToken,authorizeRole("admin","manager"),(req,res)=>{
        res.json({message:"Welcome Manager"})
    })

// All can access this route
router.get("/user",verifyToken,authorizeRole("admin","manager","user"),(req,res)=>{
    res.json({message:'Welcome User'})
})


export default router