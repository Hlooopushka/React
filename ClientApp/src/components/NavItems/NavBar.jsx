import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'


export default class NavBar extends Component {
    state = { activeItem: 'customer',
             
  }
  
    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
    }
  
    render() {
      const { activeItem } = this.state;
  
      return (
          
        <Menu inverted>
            <Menu.Item
           name='React'
            />
          <Menu.Item
            as={NavLink} to="/customer"
            name='customers'
            active={activeItem === 'customers'}
            onClick={this.handleItemClick}
          />
           <Menu.Item
            as={NavLink} to="/product"
            name='Products'
            active={activeItem === 'products'}
            onClick={this.handleItemClick} 
          />
          <Menu.Item
            as={NavLink} to="/store"
            name='store'
            active={activeItem === 'store'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to="/sales"
            name='sales'
            active={activeItem === 'sales'}
            onClick={this.handleItemClick}
          />
        </Menu>
        
      )
    }
  }