import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import BackgroundLoader from '../NavItems/BackgroundLoader';



class Sales extends Component {
constructor(props) {
    super(props);

    this.state = {
    };
}
    render() {
        return( <div>
             <Button primary>New Sales</Button>
        <Table celled basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
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
     {/* <Table.HeaderCell colSpan='6'>
    <Pagination floated="right"/>
     </Table.HeaderCell> */}
      </Table.Row>
        </Table.Footer>
      </Table>
       </div>
        );
      }
    }
export default Sales;