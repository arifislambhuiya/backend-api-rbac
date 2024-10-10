import jwt from 'jsonwebtoken'

export const verifyToken =  (req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization


    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({message:"No token ,authorization denied"})
        }
        
        console.log(token)

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode
            console.log("The Decode User",req.user)
            next()

        } catch (error) {
            res.status(400).json({message:"Token is not valid"})
        }
    }
    res.status(401).json({message:"No token ,authorization denied"})
    

}




