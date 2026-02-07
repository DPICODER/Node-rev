const joi = require('joi');

/**
 * Validation schemas for auth routes
 */

const createAssetValidator = joi.object({
        assetTag:joi.string().trim().min(3).max(50).required(),
        name:joi.string().trim().min(5).max(50).required(),
        category:joi.string().trim().valid('IT','Vehicle','Furniture','Other').optional(),
        status:joi.string().trim().valid('available','allocated','repair','retired').optional(),
        description:joi.string().trim().min(6).max(500).required(),
        purchaseDate:joi.date().max('now').required(),
        purchaseCost:joi.number().strict().positive().precision(2).required(),
});


module.exports = createAssetValidator