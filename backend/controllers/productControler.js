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
        fs.unlinkSync(`./uploads/${Isproduct.image}`);
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