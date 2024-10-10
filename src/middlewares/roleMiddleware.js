const authorizeRole = (...allowedRoles) =>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.statue(403).json({message:"access denied"})
        }
            next()
    }
}

export{

    authorizeRole
}