module.exports = (sequelize, DataTypes) => {    
    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        category: {
            type: DataTypes.STRING
            },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL,
            min: 0,
            max: 5

        },
        reviews: {
            type: DataTypes.INTEGER,
        },
    });
    return Product;
}