const errorMiddleware=(err,erq,res,next)=>{
    const defaultError={
        status:404,
        success:"failed",
        message:err
    };
    if(err?.name==="ValidationError"){
        defaultError.status(404);
        defaultError.message=Object.values(err,errors)
        .map((e)=>e.message)
        .join(",")
    }
    //duplicate error

    if(err.code&&err.code===1100){
        defaultError.status=404;
        defaultError.message=`${Object.values(err.keyValue)} field has to be unique !`
    }

res.status(defaultError.status).json({
    status:defaultError.success,
    message:defaultError.message

})
}
module.exports=errorMiddleware;