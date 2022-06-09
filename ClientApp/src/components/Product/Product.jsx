import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Pagination } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import ProductModal from './ProductModal';
import EditProductMod from './EditProductMod';
//import { fetchCustomer } from '../../utils/fetchCustomers';
// import Pagination from '../NavItems/Pagination';



class Product extends Component {
constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: false,
      showCreateModal: false,
      showEditModal: false,
      currentId: null,
      currentName: '',
      currentAddress: '' 
    };
}

fetchProduct() {
  axios.get("Products/GetProduct").then((res) => {this.setState({
    product:res.data,
  });})
  };

componentDidMount() {
  this.fetchProduct()
  this.setState({currentProduct: this.state.product[0]})
}

openCreateModal = (value) => {
  this.setState({
    showCreateModal : value,

  });
  this.fetchProduct();
}
openEditModal = (value, id, name, price) => {
  this.setState({currentId: id, currentName: name, currentPrice: price})
  this.setState({
    showEditModal: value,
    
  })
}
closeEditModal = () => {
  this.setState({
    showEditModal: false
  })
  this.fetchProduct()
}
deleteRecord = (id) => {
  this.setState({
    loading: true,
  });
  axios
  .delete(`Products/DeleteProduct/${id}`)
  .then(({ data }) => {
    this.fetchProduct()
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
          const { product, loading, showCreateModal, showEditModal} = this.state;
        return loading ? (
          <BackgroundLoader/>
        ) : ( <div>
          {/* props = showCreateModal and a state = showCreateModal */}
          <ProductModal showCreateModal={showCreateModal} 
          openCreateModal={this.openCreateModal} 
          />
         <Button primary onClick={() => 
          this.openCreateModal(true)}>New Product</Button>
        <Table celled basic className="ui celled striped table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <EditProductMod
                showEditModal={showEditModal} 
                openEditModal={this.openEditModal}  
                id={this.state.currentId}
                name={this.state.currentName}
                price={this.state.currentPrice}
                closeEditModal={this.closeEditModal}
                />
          {product.map((s, index) => {
            return ( 
            <Table.Row key={`${s.name}${index}`} >
              <Table.Cell className='classCell'>{s.name}</Table.Cell>
              <Table.Cell>{s.price}</Table.Cell>
              <Table.Cell>
                <Button 
                  color='yellow' 
                  onClick={() => this.openEditModal(true, s.id, s.name, s.price)}>
                    <Icon name='edit'/>
                     EDIT
                    </Button>
              </Table.Cell>
              <Table.Cell>
                <Button 
                color='red' 
                onClick={() => this.deleteRecord(s.id)}>
                  <Icon name='trash'/>
                  DELETE
                </Button>
                </Table.Cell>
            </Table.Row>
              )
          })}

        </Table.Body>
        
      </Table>
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
       </div>
        );
        }
    }
   
 export default Product; 