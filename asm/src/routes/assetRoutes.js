const express = require('express');
const protect = require('../middlewares/authMiddleware');
const createAssetValidator = require('../validators/assetEntryValidator');
const validate = require('../middlewares/validate');
const { createAsset, listAssets, getAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const adminOnly = require('../middlewares/admin.middleware');
const assetRouter = express.Router();

// list all assets
assetRouter.get('/',protect,listAssets);

// create a asset [admin only]
assetRouter.post('/',protect,adminOnly,validate(createAssetValidator),createAsset)

// get a asset by it's id
assetRouter.get('/:id',protect,getAsset);

// update a asset by it's id 
assetRouter.put('/:id',protect,updateAsset);

// delete a asset by it's id [admin only]
assetRouter.delete('/:id',protect,adminOnly,deleteAsset);


module.exports = assetRouter;