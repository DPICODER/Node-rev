const express = require('express');
const protect = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/admin.middleware');
const { getLogs } = require('../controllers/adminController');
const adminRouter = express.Router();
adminRouter.get('/audit-logs',protect,adminOnly,getLogs);

module.exports = adminRouter;