module.exports = (sequelize, DataTypes) => {
    const Credit = sequelize.define('credit', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Nullable for unregistered users
            references: {
                model: 'users',
                key: 'id',
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true, // Nullable for registered users
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            max: 10,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productName:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.INTEGER
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending',
        },
    });

    return Credit;
};

