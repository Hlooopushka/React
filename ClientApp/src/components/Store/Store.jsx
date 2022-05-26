import React, { Component } from 'react';
//import { Button } from 'reactstrap';
import { Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import Icons from '../NavItems/Icons';
//import styled from 'styled-components';


class Store extends Component {
constructor(props) {
    super(props);

    this.state = {
    };
}


    render() {
        return( <div>
             <Button primary>New Store</Button>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='arrowContainer'>Name<Icons/></Table.HeaderCell>
            <Table.HeaderCell className='arrowContainer'>Addresse<Icons/></Table.HeaderCell>
            {/* <Table.HeaderCell className='arrowContainer'>Name<Icons/></Table.HeaderCell>
            <Table.HeaderCell className='arrowContainer'>Addresse<Icons/></Table.HeaderCell> */}
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
export default Store;
/* .arrowContainer {
  display: flex;
  flex-direction: row;
} */