const NewsModel = require("../../models/NewsModel");

const NewsService = {
    add:async ({title,content,category,cover,isPublish,editTime}) => {
        return NewsModel.create({
            title,content,category,cover,isPublish,editTime
        })
    },

    //验证cover是否被更改。若更改就全部更新，否则不更新cover字段
    updateList:async ({id,title,content,category,cover,isPublish,editTime}) => {
        if(cover){
            return NewsModel.update({id},{
                title,content,category,cover,isPublish,editTime
            })
        }else {
            return NewsModel.update({id},{
                title,content,category,isPublish,editTime
            })
        }

    },

    // 新闻列表获取
    getList:async ({id})=>{
        return id?NewsModel.find({id}):NewsModel.find({})
    },

    publish:async ({id,isPublish,editTime})=> {
        return NewsModel.update({
            id
        },{
            isPublish,
            editTime
        })
    },

    delList:async (id)=> {
        return NewsModel.delete(id)
    },
}

module.exports = NewsService