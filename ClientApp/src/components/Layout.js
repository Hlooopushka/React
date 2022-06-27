import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavItems/NavBar';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavBar/>
        <Container>
          {this.props.children}
        </Container>
        <footer>  
          <hr/>
          <br/>
          © 2022 - Ana Ivina
          <br/>
        </footer>
      </div>
    );
  }
}
