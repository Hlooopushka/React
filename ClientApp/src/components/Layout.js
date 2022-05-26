import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavItems/NavBar';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        {/* <NavMenu /> */}
        <NavBar/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}