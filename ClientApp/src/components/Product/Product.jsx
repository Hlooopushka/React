import React, { Component } from 'react';
//import { Button } from 'reactstrap';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
//import styled from 'styled-components';


class Product extends Component {
constructor(props) {
    super(props);

    this.state = {
    };
}

    render() {
        return( <div>
             <Button primary>New Product</Button>
        <Table celled basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
            
        <Table.Body  >
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            {/* <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell> */}
          </Table.Row>
        </Table.Body>
        <Table.Footer>
      <Table.Row>
        {/* <Table.HeaderCell colSpan='4'>
    <Pagination floated="right"/>
        </Table.HeaderCell> */}
      </Table.Row>
    </Table.Footer>
      </Table>
       </div>
        );
        }
    }
// }
export default Product;