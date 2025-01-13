
module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define("orderDetail", {
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }
    });
    return  OrderDetail;
}