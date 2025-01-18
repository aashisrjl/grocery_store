const { product, category, users } = require("../models");
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
            message:"Product not found"
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
    const categoryId = req.params.id
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
    const rating = req.params.rating
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

const { product, category, Sequelize } = require('../models');
const { Op } = Sequelize;

exports.getProductByCategoryName = async (req, res) => {
    const categoryName = req.params.categoryName;

    try {
        const data = await product.findAll({
            include: {
                model: category,
                as: 'Category', // Ensure this matches the alias defined in the association
                where: {
                    categoryName: { [Op.like]: `%${categoryName}%` } // Use Op.like for partial matching
                },
                attributes: ['categoryName'] // Specify the fields you want from the category table
            }
        });

        // Check if no products are found
        if (data.length === 0) {
            return res.status(404).json({
                message: "No products found with this category name",
            });
        }

        // Respond with the retrieved products
        res.status(200).json({
            message: "Products retrieved successfully by category name",
            data,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            message: "An error occurred while fetching products",
            error: error.message,
        });
    }
};



