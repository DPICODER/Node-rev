const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const testRouter = express.Router();



// Test Route for checking user creation
// testRouter.get('/create-test-user',async(req,res,next)=>{
//     try {
//         const user = await User.create({
//             email:'varun@gmail.com',
//             firstName:'SaiVarun',
//             lastName:'Pannala',
//             password:'stronkPassword123'
//         })
//         const {password,...safeUser} = user.toJSON();
//         res.json(safeUser);
//     } catch (error) {
//         next(err);
//     }
// })


// Test Route Error middleware test error 
/* testRouter.get("/test-error", (req, res, next) => {
   next(new Error("This is a test error"));
 });*/

// Test Route to check Authorization / JWT
/*
testRouter.get('/me',protect,(req,res)=>{
  res.json({
    id:req.user.id,
    email:req.user.email,
    role:req.user.role
  });
});
 */

// Test Route to check Role base authentication
testRouter.get('/admin-test',protect,authorize("admin"),(req,res)=>{
    res.json({message:"Welcome ADMIN"})
})



module.exports = testRouter;