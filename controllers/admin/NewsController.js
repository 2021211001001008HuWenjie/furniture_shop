const NewsService = require("../../services/admin/NewsService");

const NewsController = {
    add:async (req,res) => {
        console.log(req.file,req.body)
        //调用service进行添加
        const cover = req.file?`/news_cover_uploads/${req.file.filename}`:""
        const { title,content,category,isPublish } = req.body
        await NewsService.add({
            title,
            content,
            category:Number(category),
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },

    updateList:async (req,res) => {
        const cover = req.file?`/news_cover_uploads/${req.file.filename}`:""
        const { title,content,category,isPublish,id } = req.body
        await NewsService.updateList({
            id,
            title,
            content,
            cover,
            category:Number(category),
            isPublish:Number(isPublish),
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },

    getList:async (req,res) => {
        const result = await NewsService.getList({id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    publish:async (req,res) => {
        const result = await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    delList:async (req,res) => {
        await NewsService.delList({id:req.params.id})
        res.send({
            ActionType:"OK",
        })
    },



}

module.exports = NewsController