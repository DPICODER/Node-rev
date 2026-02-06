const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { Asset } = require('../models');
const createAssetValidator = require('../validators/assetEntryValidator');
const validate = require('../middlewares/validate');
const { createAsset, listAssets, getAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const assetRouter = express.Router();


assetRouter.post('/assets',protect,validate(createAssetValidator),createAsset)

assetRouter.get('/assets',protect,listAssets);

assetRouter.get('/:id',protect,getAsset);

assetRouter.put('/:id',protect,updateAsset);

assetRouter.delete('/:id',protect,deleteAsset);


module.exports = assetRouter;