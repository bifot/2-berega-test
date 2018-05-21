import React, { Component } from 'react'
import { Input, Select, Spin, Button } from 'antd'
import axios from 'axios'

const { Option } = Select

export default class Constructor extends Component {
  state = {
    title: null,
    defaultIngredients: [],
    ingredients: [],
    ingredient: null
  }

  setTile = (event) => {
    const { value } = event.target

    this.setState({
      title: value
    })
  }

  setIngredient = (id) => {
    const { defaultIngredients } = this.state
    const ingredient = defaultIngredients.find(item => item.id === id)

    this.setState({
      ingredient
    })
  }

  addIngredient = () => {
    const { ingredient, ingredients } = this.state

    if (ingredient) {
      this.setState({
        ingredients: [
          ...ingredients,
          ingredient
        ]
      })
    }
  }

  deleteIngredient = (index) => {
    const { ingredients } = this.state

    this.setState({
      ingredients: [
        ...ingredients.slice(0, index),
        ...ingredients.slice(index + 1)
      ]
    })
  }

  createPizza = async () => {
    try {
      const { title, ingredients } = this.state

      await axios.post('/api/pizzas', {
        title,
        ingredients
      })

      alert('Пицца успешно создана!')
    } catch (err) {
      console.error(err)
    }
  }

  async componentDidMount () {
    try {
      const { data } = await axios('/api/pizzas/ingredients')

      this.setState({
        defaultIngredients: data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const {
      title,
      defaultIngredients,
      ingredient,
      ingredients
    } = this.state

    return (
      <div>
        <h1>Конструктор пиццы</h1>
        <Input
          style={{
            margin: '10px 0',
            width: 200,
            display: 'block'
          }}
          placeholder='Название пиццы'
          onChange={this.setTile}
        />
        <Select
          style={{
            margin: '10px 0',
            width: 200,
            display: 'block'
          }}
          value={
            ingredient
              ? ingredient.title
              : 'Выберите ингредиент'
          }
          onChange={this.setIngredient}
        >
          {
            defaultIngredients.map(({ title, id }) => {
              return <Option value={id} key={id}>{title}</Option>
            })
          }
        </Select>
        <Button
          type='primary'
          style={{
            margin: '10px 0',
            width: 200,
            display: 'block'
          }}
          onClick={() => this.addIngredient()}
          disabled={!ingredient}
        >
          Добавить ингредиент
        </Button>
        {
          !!ingredients.length &&
            <ul style={{ margin: '20px 0' }}>
              {
                ingredients.map(({ title }, index) => {
                  return (
                    <li key={index}>
                      {title}
                      { ' ' }
                      <a
                        href='#!'
                        onClick={() => this.deleteIngredient(index)}
                      >
                        удалить
                      </a>
                    </li>
                  )
                })
              }
            </ul>
        }
        <Button
          type='primary'
          style={{
            width: 200,
            display: 'block'
          }}
          disabled={!title || !ingredients.length}
          onClick={() => this.createPizza()}
        >
          Сохранить пиццу
        </Button>
      </div>
    )
  }
}
