import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import ProductModal from './ProductModal';
import EditProductMod from './EditProductMod';
import Pagination from '../NavItems/Pagination';
import PageSelect from '../NavItems/PageSelect';
import {setPages} from '../../utils/setPages'


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
      currentAddress: '',
      perPage: 10,
      items:[]
    };
}

componentDidMount() {
  this.fetchProduct()
  this.changePage(1)
  //this.setState({currentProduct: this.state.product[0]})
  
}

fetchProduct() {
  axios.get("Products/GetProduct")
  .then((res) => {
    this.setState({
    product:res.data,
  });
  this.changePage(1)
})
  };

// componentWillUnmount() {
//   if (this.state.product.length > 0) {this.changePage(1)}  
// }


changePerPage = (e) => {
  this.setState({perPage:parseInt(e.target.value)})
  const tmpArray = this.state.product.slice(0 , parseInt(e.target.value))
  this.setState({items:tmpArray});

  }


changePage = (page) => {
  let startItem = (page-1) * this.state.perPage;
  let endItem = startItem + this.state.perPage;
  const tmpArray = this.state.product.slice(startItem , endItem);
  this.setState({items:tmpArray});
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
  .then(() => {
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
        <Table.Body>
        <EditProductMod
                showEditModal={this.showEditModal} 
                openEditModal={this.openEditModal}  
                id={this.state.currentId}
                name={this.state.currentName}
                price={this.state.currentPrice}
                closeEditModal={this.closeEditModal}
                />
          {this.state.items.map((s, index) => {
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
        <Table.Footer>
      <Table.Row>
        {/* <Table.HeaderCell colSpan='4'>
    <Pagination floated="right"/>
        </Table.HeaderCell> */}
      </Table.Row>
    </Table.Footer>
      </Table>
      <div className="paginator-container">
            <PageSelect
            changePerPage={this.changePerPage}/>
            <Pagination
                changePage={this.changePage} 
                maxPages={setPages(this.state.product, this.state.perPage)}
                perPage={this.state.perPage}
            />
        </div>
       </div>
        );
        }
    }
// }
export default Product;