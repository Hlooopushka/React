import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button} from 'semantic-ui-react';
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader';
import SalesModal from './SalesModal';
import EditSales from './EditSalesModal';
import Pagination from '../NavItems/Pagination';
import PageSelect from '../NavItems/PageSelect';
import {setPages} from '../../utils/setPages'



class Sales extends Component {
constructor(props) {
    super(props);

    this.state = {
      sales: [],
      customers: [],
      store: [],
      product: [],
      loading: false,
      showCreateModal: false,
      showEditModal: false,
      currentId: null,
      currentCustomer: '',
      currentProduct: '',
      currentStore:'',
      perPage: 10,
      items:[],
      Date: Date()
    };
}
// currentDate() {

// }
componentDidMount() {
  this.fetchSales();
  this.fetchCustomer()
  this.fetchStore()
  this.fetchProduct()
  this.setState({currentSales: this.state.sales[0]})
  
}
// componentWillUnmount() {
//   if (this.state.sales.length > 0) {this.changePage(1)}  
// }

changePerPage = (e) => {
  this.setState({perPage:e.target.value})
  const tmpArray = this.state.sales.slice(0 , e.target.value)
  this.setState({items:tmpArray})
}


changePage = (page) => {
  let startItem = (page-1) * this.state.perPage;
  let endItem = startItem + this.state.perPage
  const tmpArray = this.state.sales.slice(startItem , endItem)
  this.setState({items:tmpArray})
}

fetchCustomer() {
  axios.get("Customers/GetCustomer").then((res) => {
    this.setState({
    customers:res.data,
  });})
  };
fetchStore = () => {
    axios.get("Stores/getStore").then((res) => {
      this.setState({
        store:res.data,
      });})
      };
fetchProduct() {
    axios.get("Products/GetProduct").then((res) => {
      this.setState({
        product:res.data,
        });})
        };     


        
fetchSales = () => {
  axios
  .get("Sales/GetSales")
  .then(({ data }) => {
    this.setState({
      sales: data,
    });
    this.changePage(1)
  })
  .catch((err) => {
    console.log(err);
  });
};
openCreateSalesModal = (value) => {
  
  this.setState({
    showCreateModal : value,
  });

  
}
openEditSalesModal = (value, id, customer, product,  store) => {
  this.setState({currentId: id, currentCustomer: customer, 
    currentProduct: product, currentDate: new Date, currentStore: store })
  this.setState({
    showEditModal: value,
    
  })
}
closeEditModal = () => {this.setState({showEditModal: false
  })
  this.fetchSales()
}
deleteRecord = (id) => {
  this.setState({
    loading: true,
  });
  axios
  .delete(`Sales/DeleteSales/${id}`)
  .then(({ data }) => {
    this.fetchSales();
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

getCustomerName(id) {
  const customer = this.state.customers.filter(customer => customer.id === id)
  if (customer[0]) {return customer[0].name}
}

getProductName(id) {
  const product = this.state.product.filter(product => product.id === id)
  if (product[0]) {return product[0].name}
}
getStoreName(id) {
  const store = this.state.store.filter(store => store.id === id)
  if (store[0]) {return store[0].name}
}

    render() {
          const { sales, loading, showCreateModal, showEditModal} = this.state;
        return loading ? (
          <BackgroundLoader/>
        ) : ( <div>
          {/* props = showCreateModal and a state = showCreateModal */}
          <SalesModal showCreateModal={showCreateModal} 
          openCreateSalesModal={this.openCreateSalesModal} 
          fetchSales={this.fetchSales}
          customers={this.state.customers}
          store={this.state.store}
          product={this.state.product}
          
          
          />
         <Button primary onClick={() => 
          this.openCreateSalesModal(true)}>New Sale</Button>
        <Table celled basic className="ui celled striped table">
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
        <Table.Body>
        <EditSales 
                showEditModal={showEditModal} 
                openEditSalesModal={this.openEditSalesModal}
                fetchSales={this.fetchSales}   
                id={this.state.currentId}
                customer={this.state.currentCustomer}
                // customer={this.state.currentCustomer}
                product={this.state.currentProduct}
                store={this.state.currentStore}
                closeEditModal={this.closeEditModal}
                />
          {this.state.items.map((s) => {
            return ( 
            <Table.Row key={s.id} >
              <Table.Cell className='classCell'>{this.getCustomerName(s.customerId)}</Table.Cell>
              <Table.Cell>{this.getProductName(s.productId)}</Table.Cell>
              <Table.Cell>{this.getStoreName(s.storeId)}</Table.Cell>
              <Table.Cell>{new Date(s.dateSold).toLocaleDateString('en-US')}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => 
                  this.openEditSalesModal(true, s.id, s.customer, s.product,s.Date, s.store)}>
                    <Icon name='edit'/> EDIT</Button></Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => 
                  this.deleteRecord(s.id)}><Icon name='trash'/>DELETE
                </Button>
                </Table.Cell>
            </Table.Row>
              )
          })}

        </Table.Body>
        <Table.Footer>
      <Table.Row>
     {/* <Table.HeaderCell colSpan='6'>
    <Pagination floated="right"/>
     </Table.HeaderCell> */}
      </Table.Row>
        </Table.Footer>
      </Table>
      {/* s */}
      <div className="paginator-container">
            <PageSelect
            changePerPage={this.changePerPage}/>
            <Pagination
                changePage={this.changePage} 
                maxPages={setPages(this.state.sales, this.state.perPage)}
                perPage={this.state.perPage}
            />
        </div>

       </div>
        );
      }
    }
export default Sales;