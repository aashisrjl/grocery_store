const { category } = require("../models");

//add category
exports.addCategory = async(req,res)=>{
    const {categoryName} = req.body;
    if(!categoryName){
        res.status(400).json({
            message:"Enter category name first"
        })
        return;
    }
    const data = await category.create({
        categoryName
    })
    res.status(200).json({
        message:"Category added successfully",
        data
        })
}


exports.getCategory = async(req,res)=>{
    const categories = await category.findAll();
    if(categories.length>0){
        res.status(200).json({
            message: "category fetched successfully",
            categories
        })
    }else{
        res.status(404).json({
            message: "category not found"
            })
    }

}

exports.deleteCategory = async(req,res)=>{
    const categoryId = req.params.id;
    const Iscategory = await category.findOne({
        where:{
            id:categoryId
        }
    }) 
    if(Iscategory){
        await category.destroy({
            where:{
               id: categoryId
            }
            })
            res.status(200).json({
                message: "category deleted successfully"
            })
        }else{
            res.status(404).json({
                message: "category not found with this id"
                })
        }
}

exports.getSingleCategory = async(req,res)=>{
    const categoryId = req.params.id;
    const data = await category.findOne({
        where:{
            id:categoryId
        }
    })
    if(data){
        res.status(200).json({
            message: "category fetched successfully",
            data
            })
    }else{
        res.status(404).json({
            message: "category not found with this id"
            })
    }
}

exports.updateCategory = async(req,res)=>{
    const categoryId = req.params.id;
    const {categoryName} = req.body;
    const Iscategory = await category.findOne({
        where:{
            id:categoryId
            }
            })
            if(Iscategory){
                await category.update({
                    categoryName
                    },{
                        where:{
                            id:categoryId
                            }
                            })
                            res.status(200).json({
                                message: "category updated successfully"
                                })
                            }else{
                                res.status(404).json({
                                    message: "category not found with this id"
                                    })
                            }
}
