const { Asset } = require("../models");


exports.createAsset = async (req, res, next) => {
    const { assetTag, name, category, status, description, purchaseDate, purchaseCost } = req.body;
    //add current user as createdBy
    try {
        const createdBy = req.user.id;
        const asset = await Asset.create({
            assetTag,
            name,
            category,
            status,
            description,
            purchaseDate,
            purchaseCost,
            createdBy
        })
        res.status(201).json({ success: true, message: "Asset created Successfully", asset })

    } catch (error) {
        const err = new Error("Error creating asset!!");
        err.statusCode = 500;
        return next(err);
    }
};

exports.listAssets = async (req, res, next) => {

    try {

        // pagination code with limit and offset
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if(isNaN(page)) page=1;
        if(isNaN(limit)) limit=10;

        if (page < 1) page = 1;
        if (limit > 100) limit = 100;

        const offset = (page - 1) * limit;

        const {category , status } = req.query;

        // custom filtering 
        const where = {};

        if(category){
            where.category = category;
        }
        if(status){
            where.status = status;
        }
        
        // soritng options

        let {sortBy = 'createdAt',order = 'DESC'} = req.query;

        const allowSortFields = [
            'name',
            'category',
            'status',
            'purchaseDate',
            'purchaseCost',
            'createdAt'
        ];
        
        if(!allowSortFields.includes(sortBy)){
            sortBy='createdAt';
        }

        order = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';


        const { count, rows } = await Asset.findAndCountAll({
            where,limit, offset, order: [[sortBy,order]], attributes: { exclude: ['deletedAt'] }
        })

        res.status(200).json({ success: true,
            message: "Assets Found",
            total:count,
            page,
            totalProgress:Math.ceil(count/limit),
            data:rows 
        })

    } catch (error) {
        return next(error)
    }
};

exports.getAsset = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const asset = await Asset.findOne({ where: { id, createdBy: req.user.id }, attributes: { exclude: ['deletedAt'] } });
        if (!asset) {
            const error = new Error("Asset not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ success: true, message: "Asset fetched success", data: asset })
    } catch (error) {
        return next(error)
    }
};

exports.updateAsset = async (req, res, next) => {
    try {
        const id = req.params.id;

        const asset = await Asset.findOne({ where: { id, createdBy: req.user.id }, attributes: { exclude: ['deletedAt'] } });
        if (!asset) {
            const error = new Error('Asset not found');
            error.statusCode = 404;
            return next(error);
        }

        const allowedFields = [
            "name",
            "category",
            'status',
            "description",
            "purchaseDate",
            "purchaseCost",
        ]

        const updates = {}

        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        await asset.update(updates)

        res.status(200).json({ success: true, message: "Asset updated successfully", data: asset })

    } catch (error) {
        return next(error)
    }
}


exports.deleteAsset = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const asset = await Asset.findOne({ where: { id, createdBy: req.user.id } });
        if (!asset) {
            const error = new Error('Asset not found');
            error.statusCode = 404;
            return next(error);
        }

        await asset.destroy();

        res.status(200).json({ success: true, message: "Asset Deleted Successfully", asset_id: id })


    } catch (error) {
        return next(error)
    }
}

