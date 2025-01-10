const categoryData = [
    {
        categoryName:""
    },
    {
        categoryname: ""
    },
    {
        categoryName: ""
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
        

        
    } catch (error) {
        console.log("error",error)
        
    }
}