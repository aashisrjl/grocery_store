
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("payment", {
        paymentMethod: {
        type: DataTypes.ENUM('cod','khalti','esewa'),
        allowNull: false,
        defaultValue: 'cod'
        },
        paymentStatus:{
            type: DataTypes.ENUM('paid','unpaid'),
            allowNull: false,
            defaultValue: 'unpaid'
        },
        pidx:{
            type: DataTypes.STRING
        }
    });
    return  Payment;
}