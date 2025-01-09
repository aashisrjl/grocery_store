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
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        reviews: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Product;
}