const Sequelize = require('sequelize')

const sequelize = new Sequelize('2berega', 'root', 'none', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
})

const Pizzas = sequelize.define('pizzas', {
  title: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

const Ingredients = sequelize.define('ingredients', {
  title: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

module.exports = {
  Pizzas,
  Ingredients
}
