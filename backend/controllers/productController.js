const { product, category, Sequelize, users } = require('../models');
const { Op } = Sequelize;
const fs = require("fs");

exports.addProduct = async(req,res)=>{
    const {name,price,description,unit,stock,categoryId} = req.body
    const userId = req.userId;

    if(!name || !price || !description || !unit || !stock || !categoryId){
        return res.status(200).json({
            message:"All fields are required"
        })

    }
 
    let image;
    if(req.file){
        image = req.file?.filename
    }else{
        res.status(400).json({message:"Image is required"})
    }

    const data = await product.create({
        name,
        price,
        description,
        unit,
        image,
        stock,
        categoryId,
        userId
    })
    res.status(200).json({
        message:"Product added successfully",
        data
        })
}

exports.getAllProduct = async(req,res)=>{
    const data = await product.findAll({
        include:[
            {
                model: category,
                as: 'CategoryDetails',
                attributes:['id','categoryName']
        },
        {
            model: users,
            attributes:['id','email','username']
        }
        ]
    });
    if(data.length>0){
        res.status(200).json({
            message:"Product fetched successfully",
            data
        })
    }else{
        res.status(404).json({
            message:"No product found"
        })
    }
}

exports.deleteProduct = async(req,res)=>{
    const productId = req.params.id
    const Isproduct = await product.findOne({
        where:{
            id:productId
        }
    })
    if(Isproduct){
        fs.unlink(`./uploads/${Isproduct.image}`,(err)=>{
            if(err){
                console.log(err)
                }else{
                    console.log("Image Deleted")
                    }
        })
        await product.destroy({
            where:{
                id:productId
            }
            })
            res.status(200).json({
                message:"Product deleted successfully"
            })
            }else{
                res.status(404).json({
                    message:"Product not found"
                })
            }

}

exports.getSingleProduct = async(req,res)=>{
    const productId = req.params.id;
    const data = await product.findOne({
        where:{
            id:productId
        },
        include:[
            {
                model: category,
                as: 'CategoryDetails',
                attributes:['id','categoryName']
        },
        {
            model: users,
            attributes:['id','email','username']
        }
        ]
    })
    if(data){
        res.status(200).json({
            message:"Product fetched successfully",
            data
        })
    }else{
        res.status(404).json({
            message:"Product can't found"
        })
    }
}

exports.updateProduct = async(req,res)=>{
    const productId = req.params.id;
    const {name,price,description,unit,stock,categoryId} = req.body

    const isProduct = await product.findOne({
        where:{
            id: productId
        }
    })
    
    if(!isProduct){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    fs.unlink('./uploads/'+ isProduct.image,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Image Deleted")
        }
    })
    
    const image =  req.file ? req.file.filename: isProduct.image;
    const data = await product.update({
        name: name || isProduct.name,
        price: price || isProduct.price,
        description: description || isProduct.description,
        unit: unit || isProduct.unit,
        image: image,
        stock: stock || isProduct.stock,
        categoryId: categoryId || isProduct.categoryId
    },{
        where:{
            id:productId
        }
    })
    res.status(200).json({
        message:"Product updated successfully",
        data
    })
}

//get products by category id
exports.getProductByCategory = async(req,res)=>{
    const {categoryId} = req.params
    const data = await product.findAll({
        where:{
            categoryId:categoryId
        }
    })
    if(data.length == 0){
        return res.status(404).json({
            message:"No product found in this category"
            })
    }
    res.status(200).json({
        message:"Product found in this category",
        data
        })
}

//get products by name
exports.getProductsByName = async(req,res)=>{
    const name = req.params.name
    const data = await product.findAll({
        where:{
            name: {
                [Op.like]: `%${name}%`
                }
                }
            })
    if(data.length == 0){
        return res.status(404).json({
            message:"No product found with this name"
        })
    }
    res.status(200).json({
        message: "product fetch by name",
        data   
     })

}

//get product by rating
exports.getProductByRating = async(req,res)=>{
    const {rating } = req.params
    const data = await product.findAll({
        where:{
            rating: {
                [Op.gte]: rating
            }
        }
        })
        if(data.length == 0){
            return res.status(404).json({
                message:"No product found with this rating"
            })
        }
        res.status(200).json({
            message: "product fetch by rating",
            data
        })
}


//category
exports.getProductByCategoryName = async (req, res) => {
    const categoryName = req.params.categoryName;

        const data = await product.findAll({
            include: {
                model: category,
                as: 'CategoryDetails', 
                where: {
                    categoryName: { [Op.like]: `%${categoryName}%` }                 },
                attributes: ['categoryName'] 
            }
        });

        if (data.length === 0) {
            return res.status(404).json({
                message: "No products found with this category name",
            });
        }

        res.status(200).json({
            message: "Products retrieved successfully by category name",
            data,
        });

}

//get product by description
exports.getProductByDesc = async(req,res)=>{
    const {desc} = req.params
    const data = await product.findAll({
        where:{
            description:{
            [Op.like]: `%${desc}%`
            }
        }
    })
    if(data.length == 0){
        return res.status(400).json({
            message: "product not found"
        })
    }
    res.status(200).json({
        message: "product fetched from description ",
        data
    })
} 





