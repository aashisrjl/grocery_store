
const { category } = require("../models");

const categoryData = [
    {
        name:"1"
    },
    {
        name: "2"
    },
    {
        name: "3"
    }
]
exports.categorySeeder = async(req,res)=>{
    try {
        const categories = await category.findAll();
        if(categories.length >0){
            console.log("category already seeded")
            return
        }
        //categoryData to category
        await category.bulkCreate(categoryData);
        console.log("category seeded successfully");

        
    } catch (error) {
        console.log("error",error)
        
    }
}