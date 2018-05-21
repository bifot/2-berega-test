import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Constructor from './components/Constructor'
import Pizzas from './components/Pizzas'

const { Header, Footer, Sider, Content } = Layout
const { Item: MenuItem } = Menu

export default class App extends Component {
  render () {
    return (
      <Router>
        <Layout>
          <Header>
            <Menu
              theme='dark'
              mode='horizontal'
              style={{ lineHeight: '64px' }}
            >
              <MenuItem key='1'>
                <Link to='/constructor'>
                  Конструктор пиццы
                </Link>
              </MenuItem>
              <MenuItem key='2'>
                <Link to='/pizzas'>
                  Созданные пиццы
                </Link>
              </MenuItem>
            </Menu>
          </Header>
          <Content style={{
            minHeight: '100vh',
            padding: '30px 40px'
          }}>
            <Route path='/constructor' component={Constructor} />
            <Route path='/pizzas' component={Pizzas} />
          </Content>
        </Layout>
      </Router>
    )
  }
}
