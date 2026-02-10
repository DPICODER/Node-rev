const AuditLog = require("../models/auditLog.model");

async function logEvent(data) {
    try {
        await AuditLog.create(data);
    } catch (error) {
        console.error("Audit log failed",err);
    }
}

module.exports = logEvent;