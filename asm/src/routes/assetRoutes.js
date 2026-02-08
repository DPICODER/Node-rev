const express = require('express');
const protect = require('../middlewares/authMiddleware');
const createAssetValidator = require('../validators/assetEntryValidator');
const validate = require('../middlewares/validate');
const { createAsset, listAssets, getAsset, updateAsset, deleteAsset, assignAsset,returnAsset, allocationsList } = require('../controllers/assetController');
const adminOnly = require('../middlewares/admin.middleware');
const { validateAssignAsset, validateReturnAsset } = require('../middlewares/allocationValidation');
const assetRouter = express.Router();
// list all assets
assetRouter.get('/',protect,listAssets);

// create a asset [admin only]
assetRouter.post('/',protect,adminOnly,validate(createAssetValidator),createAsset)

assetRouter.get('/allocations',protect,allocationsList);
// get a asset by it's id
assetRouter.get('/:id',protect,getAsset);

// update a asset by it's id 
assetRouter.put('/:id',protect,updateAsset);

// delete a asset by it's id [admin only]
assetRouter.delete('/:id',protect,adminOnly,deleteAsset);

assetRouter.post('/assign/:id',protect,validateAssignAsset,assignAsset);

assetRouter.post('/return/:id',protect,validateReturnAsset,returnAsset);


module.exports = assetRouter;