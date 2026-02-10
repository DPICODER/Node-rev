const AuditLog = require("../models/auditLog.model")

exports.getLogs = async(req,res,next)=>{
    try {
        const limit = req.params.limit || 50;
        const auditLogs = await AuditLog.findAll({
            limit:limit,
            order:[['createdAt','DESC']]
        })

        if(auditLogs.length === 0){
            const error = new Error('No logs found');
            error.statusCode=404;
            return next(error);
        }
        res.status(200).json({
            success:true,
            message:"Logs Found",
            data:auditLogs
        })

    } catch (error) {
        next(error)
    }
}