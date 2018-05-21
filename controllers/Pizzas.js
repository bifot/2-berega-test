const { Pizzas, Ingredients } = require('../db')

class PizzasController {
  static async getPizzas (ctx) {
    try {
      const pizzas = await Pizzas.findAll()
      const pizzasWithIngredients = []

      for (const pizza of pizzas) {
        const ingredients = []
        const ingredientsIds = pizza.ingredients.split(',')

        for (const ingredientId of ingredientsIds) {
          const ingredient = await Ingredients.findOne({
            id: +ingredientId
          })

          ingredients.push(ingredient.toJSON())
        }

        pizzasWithIngredients.push({
          ...pizza.toJSON(),
          ingredients
        })
      }

      ctx.status = 200
      ctx.body = pizzasWithIngredients
    } catch (err) {
      console.error(err)
      ctx.status = 500
      ctx.body = { error: 'Server error.' }
    }
  }

  static async createPizza (ctx) {
    try {
      const { title, ingredients } = ctx.request.body

      if (!title || !ingredients) {
        ctx.status = 400
        ctx.body = { error: 'Invalid data.' }

        return false
      }

      await Pizzas.create({
        title,
        ingredients: ingredients
          .map(item => item.id)
          .join(','),
        status: false
      })

      ctx.status = 200
      ctx.body = { ok: true }
    } catch (err) {
      console.error(err)
      ctx.status = 500
      ctx.body = { error: 'Server error.' }
    }
  }

  static async updatePizza (ctx) {
    try {
      const { id } = ctx.params
      const { status } = ctx.request.body

      await Pizzas.update({
        status
      }, {
        where: {
          id
        }
      })

      ctx.status = 200
      ctx.body = { ok: true }
    } catch (err) {
      ctx.status = 500
      ctx.body = { error: 'Server error.' }
    }
  }

  static async getIngredients (ctx) {
    try {
      const ingredients = await Ingredients.findAll()

      ctx.status = 200
      ctx.body = ingredients.map(item => item.toJSON())
    } catch (err) {
      ctx.status = 500
      ctx.body = { error: 'Server error.' }
    }
  }
}

module.exports = PizzasController
