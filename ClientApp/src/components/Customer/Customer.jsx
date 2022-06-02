import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import CustomerModal from './CustomerModal';
import EditCustomer from './EditCustomer';
// import Pagination from '../NavItems/Pagination';



class Customer extends Component {
constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: false,
      showCreateModal: false,
      showEditModal: false,
      currentId: null,
      currentName: '',
      currentAddress: '' 
    };
}
componentDidMount() {
  this.fetchCustomer();
  this.setState({currentCustomer: this.state.customers[0]})
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
openCreateModal = (value) => {
  this.setState({
    showCreateModal : value,
  });
}
openEditModal = (value, id, name, addresse) => {
  this.setState({currentId: id, currentName: name, currentAddress: addresse})
  this.setState({
    showEditModal: value,
    
  })
}
closeEditModal = () => {
  this.setState({
    showEditModal: false
  })
  this.fetchCustomer()
}
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

    render() {
          const { customers, loading, showCreateModal, showEditModal} = this.state;
        return loading ? (
          <BackgroundLoader/>
        ) : ( <div>
          {/* props = showCreateModal and a state = showCreateModal */}
          <CustomerModal showCreateModal={showCreateModal} 
          openCreateModal={this.openCreateModal} 
          fetchCustomer={this.fetchCustomer}
          />
         <Button primary onClick={() => 
          this.openCreateModal(true)}>New Customer</Button>
        <Table celled basic className="ui celled striped table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Addresse</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <EditCustomer 
                showEditModal={showEditModal} 
                openEditModal={this.openEditModal}
                fetchCustomer={this.fetchCustomer}   
                id={this.state.currentId}
                name={this.state.currentName}
                addresse={this.state.currentAddress}
                closeEditModal={this.closeEditModal}
                />
          {customers.map((s, index) => {
            return ( 
            <Table.Row key={`${s.name}${index}`} >
              <Table.Cell className='classCell'>{s.name}</Table.Cell>
              <Table.Cell>{s.addresse}</Table.Cell>
              <Table.Cell>
                
                <Button color='yellow' onClick={() => 
                  this.openEditModal(true, s.id, s.name, s.addresse)}><Icon name='edit'/> EDIT</Button></Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => 
                  this.deleteRecord(s.id)}><Icon name='trash'/>DELETE
                </Button>
                </Table.Cell>
            </Table.Row>
              )
          })}

        </Table.Body>
        
      </Table>
      <Table.Footer>
       
        {/* <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row> */}
      </Table.Footer>
       </div>
        );
        }
    }
   
 export default Customer; 