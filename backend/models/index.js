const dbConfig = require("../database/config.js");
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port : 3306, //21661,  // add 3306 for tye internal localhost

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 
db.users = require("./userModel.js")(sequelize, DataTypes);
db.category = require("./categoryModel.js")(sequelize, DataTypes);
db.product = require("./productModel.js")(sequelize, DataTypes);
db.cart = require("./cartModel.js")(sequelize, DataTypes);
db.order = require("./orderModel.js")(sequelize, DataTypes);
db.orderDetails = require("./orderDetailModel.js")(sequelize, DataTypes);
db.payment = require("./paymentModel.js")(sequelize, DataTypes);

//connections

// User and Product association
db.users.hasMany(db.product, { foreignKey: 'userId' });
db.product.belongsTo(db.users, { foreignKey: 'userId' });

// Category and Product association
db.category.hasOne(db.product, { foreignKey: 'categoryId', as: 'CategoryDetails' });
db.product.belongsTo(db.category, { foreignKey: 'categoryId', as: 'CategoryDetails' });

// User and Cart association
db.users.hasMany(db.cart, { foreignKey: 'userId' });
db.cart.belongsTo(db.users, { foreignKey: 'userId' });
// Cart and Product association
db.product.hasMany(db.cart, { foreignKey: 'productId' });
db.cart.belongsTo(db.product, { foreignKey: 'productId' });

// //order and order details
db.order.hasMany(db.orderDetails)
db.orderDetails.belongsTo(db.order)

//orderDetail and Product
db.product.hasMany(db.orderDetails)
db.orderDetails.belongsTo(db.product)

//order and payment
db.payment.hasOne(db.order)
db.order.belongsTo(db.payment)

//user and order
db.users.hasMany(db.order)
db.order.belongsTo(db.users)


 


// db.users.hasMany(db.questions)
// db.questions.belongsTo(db.users)

// db.questions.hasMany(db.answers)
// db.answers.belongsTo(db.questions)

// db.users.hasMany(db.answers)
// db.answers.belongsTo(db.users)

db.sequelize.sync({ force: false}).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;