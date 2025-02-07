const ProductModel = require("../../models/ProductModel");

const ProductService = {
    add:async ({name,price,info,introduction,state,stock_num,store,category_id,tags,img,editTime}) => {
        return ProductModel.create({
            name,price,info,introduction,state,stock_num,store,category_id,tags,img,editTime
        })
    },

    // //验证cover是否被更改。若更改就全部更新，否则不更新cover字段
    // updateList:async ({id,title,content,category,cover,isPublish,editTime}) => {
    //     if(cover){
    //         return NewsModel.update({id},{
    //             title,content,category,cover,isPublish,editTime
    //         })
    //     }else {
    //         return NewsModel.update({id},{
    //             title,content,category,isPublish,editTime
    //         })
    //     }
    //
    // },
    //
    // 商品列表获取
    getList:async ({id})=>{
        return id?ProductModel.find({id}):ProductModel.find({})
    },
    //
    // publish:async ({id,isPublish,editTime})=> {
    //     return NewsModel.update({
    //         id
    //     },{
    //         isPublish,
    //         editTime
    //     })
    // },
    //
    delList:async (id)=> {
        return ProductModel.delete(id)
    },
    getImage:async (id)=> {
        return ProductModel.find({id},["img"])
    },
}

module.exports = ProductService