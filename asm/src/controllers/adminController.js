const AuditLog = require("../models/auditLog.model");
const NotFoundError = require("../utils/errors/NotFoundError");

exports.getLogs = async(req,res,next)=>{
    try {
        const limit = req.params.limit || 50;
        const auditLogs = await AuditLog.findAll({
            limit:limit,
            order:[['createdAt','DESC']]
        })

        if(auditLogs.length === 0){
            throw new NotFoundError('No logs found')
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