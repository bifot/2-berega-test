import React, { Component } from 'react'
import { Table, Switch } from 'antd'
import axios from 'axios'

export default class Pizzas extends Component {
  state = {
    pizzas: []
  }

  changeStatus = async (status, id) => {
    try {
      const { pizzas } = this.state

      await axios.put(`/api/pizzas/${id}`, {
        status
      })

      this.setState({
        pizzas: pizzas.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              status
            }
          }

          return item
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  async componentDidMount () {
    try {
      const { data } = await axios('/api/pizzas')

      this.setState({
        pizzas: data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { pizzas } = this.state
    const { changeStatus } = this.props
    const columns = [
      {
        title: 'Название',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Ингредиенты',
        dataIndex: 'ingredients',
        key: 'ingredients',
        render: (ingredients) => ingredients
          .map(item => item.title)
          .join(', ')
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (status, { id }) => <Switch defaultChecked={status} onChange={(status) => this.changeStatus(status, id)} />
      }
    ]

    return (
      <div>
        <h1>Мои пиццы</h1>
        <Table
          dataSource={pizzas}
          columns={columns}
          rowKey={(item, i) => i}
        />
      </div>
    )
  }
}
