const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const Pizzas = require('./controllers/Pizzas')

const app = new Koa()
const router = new Router()

const { PORT = 7777 } = process.env

app.use(bodyParser())

router.get('/api/pizzas', (ctx) => Pizzas.getPizzas(ctx))
router.get('/api/pizzas/ingredients', (ctx) => Pizzas.getIngredients(ctx))
router.post('/api/pizzas', (ctx) => Pizzas.createPizza(ctx))
router.put('/api/pizzas/:id', (ctx) => Pizzas.updatePizza(ctx))

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port`)
})
