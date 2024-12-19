const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   "mssql://D1nn\\21522s/Bakery?encrypt=true&Trusted_Connection=true"
// );
//
const sequelize = new Sequelize("bakery", "d1nn", "d1nn", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
  // trustServerCertificate: true,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cakes = require("./Cake.model")(sequelize, Sequelize);
db.users = require("./User.model")(sequelize, Sequelize);
db.groups = require("./Group.model")(sequelize, Sequelize);
db.types = require("./Type.model")(sequelize, Sequelize);

db.cakes.belongsTo(db.types, {
  foreignKey: "type_id",
});
db.cakes.belongsTo(db.groups, {
  foreignKey: "group_id",
});
db.types.belongsTo(db.groups, {
  foreignKey: "group_id",
});

module.exports = db;
