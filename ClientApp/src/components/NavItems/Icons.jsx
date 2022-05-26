import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

export default class Icons extends Component {
    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
    }
  
    render() {
      const { activeItem } = this.state;
  
      return (

        <div className='arrowContainer'>
        <Icon name='caret down' size='small' color='grey'/>
        <Icon name='sort ascending' size='small' color='grey'/>
        </div>

        
      )
    }
  }