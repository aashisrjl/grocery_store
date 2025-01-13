module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 10],
                    msg: "Phone number must be exactly 10 digits"
                },
                isNumeric: {
                    msg: "Phone number must contain only digits"
                }
            }
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: 1,
                    msg: "Total amount must be at least 1"
                }
            }
        },
        orderStatus: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'delivery', 'ontheway', 'preparation'),
            allowNull: false,
            defaultValue: "pending"
        }
    });

    return Order;
};
