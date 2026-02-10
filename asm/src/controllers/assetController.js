const { where, ValidationErrorItemType } = require("sequelize");
const sequelize = require("../config/database");
const { Asset, Allocation, User } = require("../models");
const { lock, all } = require("../routes/assetRoutes");
const logEvent = require("../services/audit.service");


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

        await logEvent({
            userId:req.user.id,
            action:'CREATE_ASSET',
            entityType:'ASSET',
            entityId:asset.id,
            ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            metadata:{
                "assetName":asset.name,
                "category":asset.category
            }
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

        await logEvent({
            userId:req.user.id,
            action:'UPDATE_ASSET',
            entityType:'ASSET',
            entityId:asset.id,
            ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            metadata:{
                "assetName":asset.name,
                "category":asset.category
            }
        })

        res.status(200).json({ success: true, message: "Asset updated successfully", data: asset })

    } catch (error) {
        return next(error)
    }
}

exports.assignAsset = async(req , res , next)=>{
    /**Flow
     * create a transaction as we are working with multiple tables reads/updates/creations
     * check if asset exist's for given asset id
     * check if asset is available [imp : to avoid race condition lock the current record]
     * check if user exist's whom to be allocated
     * create a allocation record
     * update the asset record [status:'allocated']
     * commit the transcation
     */
    const t = await sequelize.transaction();
    try {
        const {id} = req.params;
        const {userId} = req.body;
        console.log("ID :",id);

        
        // validate asset exits -> and lock to avoid RACE Conditions
        const asset = await Asset.findOne({where:{id:id},transaction:t,lock:t.LOCK.UPDATE},);

        // fallback if no asset found
        if(!asset){
            const error = new Error("Asset not found!!");
            error.statusCode=404;//not found
            throw error;
        }

        if(asset.status !== "available"){
            const error = new Error("Asset was already allocated to another user!!!");
            error.statusCode=409; //conflict
            throw error;
        }
        //validate user exits
        const user = await User.findOne({where:{id:userId},transaction:t});
        
        if(!user){
            const error = new Error("User not found!!");
            error.statusCode=404;//not found
            throw error;
        }


        const allocation = await Allocation.create({
            assetId:id,
            userId,
        },{transaction:t})

        await asset.update({status:'allocated'},{transaction:t});

        await t.commit();

        await logEvent({
            userId:req.user.id,
            action:'ALLOCATE_ASSET',
            entityType:'ASSET',
            entityId:asset.id,
            ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            metadata:{
                assetName:asset.name,
                category:asset.category
            }
        })


        res.status(201).json(
        {
            success:true,
            message:"Asset Assigned and updated Successfully",
            data: allocation
        }
        )

    } catch (error) {
        await t.rollback();
        return next(error); 
    }
}

exports.returnAsset = async(req,res,next)=>{
    const t = await sequelize.transaction();
    try {
        
        const {id} = req.params;

        const asset = await Asset.findOne({where:{id},transaction:t,lock:t.LOCK.UPDATE});

        if(!asset){
            const error = new Error("Asset not found");
            error.statusCode = 404;
            throw error;
        }

        if(asset.status !== "allocated"){
            const error = new Error("Asset is not yet Allocated !!!")
            error.statusCode = 409;
            throw error;
        }

        const allocation = await Allocation.findOne({where:{assetId:id,status:'active'},transaction:t,lock:t.LOCK.UPDATE});

        if(!allocation){
            const error = new Error("Allocation record not found!!");
            error.statusCode=404;
            throw error;
        }
        await allocation.update({status:'returned',returnedAt: new Date()},{transaction:t});

        await asset.update({status:'available'},{transaction:t})


        await t.commit();

        await logEvent({
            userId:req.user.id,
            action:'RETURN_ASSET',
            entityType:'ASSET',
            entityId:asset.id,
            ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            metadata:{
                "assetName":asset.name,
                "category":asset.category
            }

        })


        res.status(200).json({
            success:true,
            message:"Asset returned successfully",
        })

    } catch (error) {
        await t.rollback();
        next(error)
    }
}

exports.allocationsList = async(req,res,next)=>{
    try {
        const allocations = await Allocation.findAll({
            include:[
                {
                    model:Asset.unscoped(),
                    as:'asset',
                    attributes:['id','assetTag','name','status'],
                },
                {
                    model:User,
                    as:'user',
                    attributes:['id','userName','email'],
                },
            ],order:[['assignedAt','DESC']]
        });

        res.status(200).json({
            success:true,
            count:allocations.length,
            data:allocations
        })

    } catch (error) {
        next(error)
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
        await logEvent({
            userId:req.user.id,
            action:'DELETE_ASSET',
            entityType:'ASSET',
            entityId:asset.id,
            ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            metadata:{
                "assetName":asset.name,
                "category":asset.category
            }
        })
        res.status(200).json({ success: true, message: "Asset Deleted Successfully", asset_id: id })


    } catch (error) {
        return next(error)
    }
}

