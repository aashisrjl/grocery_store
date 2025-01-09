const { ENUM } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
    username: {
            type: DataTypes.STRING,
            allowNull:false
          },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING
      },
      role:{
        ENUM: ['admin','customer'],
        type: DataTypes.STRING,
        defaultValue: "customer"
      },
      googleId:{
        type: DataTypes.STRING,
      },
        facebookId:{
            type: DataTypes.STRING,
        },
        imgUrl:{
            type: DataTypes.STRING,

        },
      otp:{
        type: DataTypes.INTEGER,
      }

    });
    return User;
  };