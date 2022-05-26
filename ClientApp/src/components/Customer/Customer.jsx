import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import './customer.css';
import CustomerModal from './CustomerModal';


class Customer extends Component {
constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: false,
      showCreateModal: false,
    };
}

componentDidMount() {
  this.fetchCustomer();
}

fetchCustomer = () => {
  axios
  .get("Customers/GetCustomer")
  .then(({ data }) => {
    this.setState({
      customers: data,
    });
   console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
};

// createCustomer = (id) => {
//   axios
//   .create(`Customers/PostCustomer/${id}`)
//   .then(({ data }) => {
//     this.setState({
//       customers: data,
//     });
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }

deleteRecord = (id) => {
  this.setState({
    loading: true,
  });
  axios
  .delete(`Customers/DeleteCustomer/${id}`)
  .then(({ data }) => {
    this.fetchCustomer();
    console.log(data);
    this.setState({
      loading: false,
    });
  })
  .catch(err => {
    console.log(err);
    this.setState({
      loading: false,
    });
  });
}; 

openCreateModal = (value) => {
  this.setState({
    showCreateModal : value,
  });
}

    render() {
          const { customers, loading, showCreateModal} = this.state;
        return loading ? (
          <BackgroundLoader/>
        ) : ( <div>
          {/* props = showCreateModal and a state = showCreateModal */}
          <CustomerModal showCreateModal={showCreateModal} openCreateModal={this.openCreateModal} fetchCustomer={this.fetchCustomer}/>
         <Button primary onClick={() => this.openCreateModal(true)}>New Customer</Button>
        <Table celled basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Addresse</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>


          {customers.map((s, index) => {
            return ( 
            <><Table.Row key={`${s.name}${index}`} >
              <Table.Cell className='classCell'>{s.name}
              </Table.Cell>

              <Table.Cell>{s.addresse}
              </Table.Cell>

              <Table.Cell>
                <Button color='yellow' Icon='edit' onClick={() => this.updateRecord(s.id)}> EDIT
                </Button>
              </Table.Cell>

              <Table.Cell>
                <Button color='red' Icon='trash' onClick={() => this.deleteRecord(s.id)}>DELETE
                </Button>
                </Table.Cell>

                
            </Table.Row>
            <Table.Row>
              </Table.Row></>)
          })}



        </Table.Body>
      </Table>
       </div>
        );
        }
    }
// }
export default Customer;