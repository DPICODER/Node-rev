const joi = require('joi');

/**
 * Validation schemas for auth routes
 */

const createAssetValidator = joi.object({
        assetTag:joi.string().required(),
        name:joi.string().min(5).required(),
        category:joi.string().optional(),
        status:joi.string().optional(),
        description:joi.string().min(6).required(),
        purchaseDate:joi.date().required(),
        purchaseCost:joi.number().required(),
});


module.exports = createAssetValidator