const ProductService = require("../../services/admin/ProductService");
const {log} = require("debug");

const ProductController = {
    add:async (req,res) => {
        console.log(req.file,req.body)
        //调用service进行添加

        const img = req.file?`/products_cover_uploads/${req.file.filename}`:""
        const { name,price,info,introduction,state,stock_num,store,category_id,tags } = req.body
        await ProductService.add({
            name,
            price,
            info,
            introduction,
            state,
            stock_num,
            store,
            category_id,
            tags,
            img,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },


    updateList:async (req,res) => {
        const img = req.file?`/products_cover_uploads/${req.file.filename}`:""
        const { id,name,price,info,introduction,state,stock_num,store,category_id,tags } = req.body
        await ProductService.updateList({
            id,
            name,
            price,
            info,
            introduction,
            state,
            stock_num,
            store,
            tags,
            img,
            category_id:Number(category_id),
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },

    getList:async (req,res) => {
        const result = await ProductService.getList({id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    //
    // publish:async (req,res) => {
    //     const result = await NewsService.publish({
    //         ...req.body,
    //         editTime:new Date()
    //     })
    //     res.send({
    //         ActionType:"OK",
    //         data:result
    //     })
    // },
    //
    delList:async (req,res) => {
        await ProductService.delList({id:req.params.id})
        res.send({
            ActionType:"OK",
        })
    },
    getImage:async (req,res) => {
        const result = await ProductService.getImage({id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
        console.log(result)
    },



}

module.exports = ProductController