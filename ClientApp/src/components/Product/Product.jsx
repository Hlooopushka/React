import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';


class Product extends Component {
constructor(props) {
    super(props);

    this.state = {
    };
}
fetchCustomer = () => {
  axios
  .get("Products/getProduct")
  .then(({ data }) => {
    // this.setState({
    //   customers: data,
    // });
   console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
};

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