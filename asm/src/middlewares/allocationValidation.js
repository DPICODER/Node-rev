exports.validateAssignAsset = (req,res,next)=>{
    const assetId = Number(req.params.id);
    const {userId} = req.body;

    if(!Number.isInteger(assetId)|| assetId <=0){
        return res.status(400).json({
            success:false,
            message:"Invalid asset ID"
        })
    }

    if(!Number.isInteger(userId)||userId <=0){
        return res.status(400).json({
            success:true,
            message:"Invalid User ID",
        });
        
    }
    next();
}

exports.validateReturnAsset = (req,res,next)=>{
    const assetId = Number(req.params.id);

    if(!Number.isInteger(assetId) || assetId <= 0){
        return res.status(400).json({
            success:false,
            message:"Invalid Asset ID"
        })
    }
    next();
}