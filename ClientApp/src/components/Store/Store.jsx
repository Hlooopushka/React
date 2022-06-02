import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import StoreModal from './StoreModal';
import EditStore from './EditStore';




class Store extends Component {
constructor(props) {
    super(props);
    this.state = {
      stores: [],
      loading: false,
      showStoreModal: false,
      storeEditModal: false,
      currentId: null,
      currentName: '',
      currentAddress: '' 
    };
}
componentDidMount() {
  this.fetchStore();
  this.setState({currentStore: this.state.stores[0]})
}
fetchStore = () => {
  axios
  .get("Stores/getStore")
  .then(({ data }) => {
    this.setState({
      stores: data,
    });
   console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
};
openCreateModal = (value) => {
  this.setState({
    showStoreModal : value,
  });
}
openEditModal = (value, id, name, addresse) => {
  this.setState({currentId: id, currentName: name, currentAddress: addresse})
  this.setState({
    storeEditModal: value,
    
  })
}
closeEditModal = () => {
  this.setState({
    storeEditModal: false
  })
  this.fetchStore()
}
deleteRecord = (id) => {
  this.setState({
    loading: true,
  });
  axios
  .delete(`Stores/deleteStore/${id}`)
  .then(({ data }) => {
    this.fetchStore();
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
          const { stores, loading, showStoreModal, storeEditModal} = this.state;
        return loading ? (
          <BackgroundLoader/>
        ) : ( <div>
          {/* props = showStoreModal and a state = showStoreModal */}
          <StoreModal showStoreModal={showStoreModal} 
          openCreateModal={this.openCreateModal} 
          fetchStore={this.fetchStore}
          />
         <Button primary onClick={() => 
          this.openCreateModal(true)}>New Store</Button>
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
        <EditStore 
                storeEditModal={storeEditModal} 
                openEditModal={this.openEditModal}
                fetchStore={this.fetchStore}   
                id={this.state.currentId}
                name={this.state.currentName}
                addresse={this.state.currentAddress}
                closeEditModal={this.closeEditModal}
                />
          {stores.map((s, index) => {
            return ( 
            <Table.Row key={`${s.name}${index}`} >
              <Table.Cell className='classCell'>{s.name}</Table.Cell>
              <Table.Cell>{s.addresse}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => 
                  this.openEditModal(true, s.id, s.name, s.addresse)}><Icon name='edit'/>
                  EDIT</Button></Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => 
                  this.deleteRecord(s.id)}><Icon name='trash'/>DELETE
                </Button>
                </Table.Cell>
            </Table.Row>
              )
          })}
{/* <Table.Footer>
        <Table.Row>
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
        </Table.Row>
      </Table.Footer> */}
        </Table.Body>
      </Table>
       </div>
        );
        }
    }
   
 export default Store; 