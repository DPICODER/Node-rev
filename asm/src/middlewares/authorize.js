/**
 * ROLE AUTHORIZATION MIDDLEWARE
 * 
 * Restricts access to routes based on alloweds roles.
 * Must run AFTER protect middleware
 * 
 * Example:
 * authorize("admin")
 * authorize("admin","manager")
 */

const authorize = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message:"Authentication Required"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message:"Forbidden: insufficient permissions"
            })
        }
        next();
    }
}

module.exports = authorize;