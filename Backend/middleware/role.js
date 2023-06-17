function role(permittedrole){
    return (req,res,next)=>{
        if(permittedrole.includes(req.role)){
            next()
        }else{
            return res.send("you are not authorized")
        }
    }
}

module.exports=role