import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function SalesModal(props) {
const {showCreateModal, openCreateSalesModal, fetchSales, customers,product, store} = props;
const [Customer, setCustomer] = useState("");
const [Product, setProduct] = useState("");
const [Store, setStore] = useState("");
const [date, setDate] = useState("");
const [icon, setIcon] = useState("");


const createSale = () => {
    axios
    .post("Sales/PostSales", {
        customerId: Customer,
        productId: Product,
        storeId: Store,
        dateSold: date.toLocaleDateString("en-US"),
        customer: null
    })
    .then(({ data }) => {
        fetchSales();
        openCreateSalesModal(false)
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   loading: true,
        // });
      });
};


  return (
    <Modal open={showCreateModal}>
      <Modal.Header>Create customer</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
      <label>Date sold</label>
      <input type="Date" onChange={(e) => setDate(new Date(e.target.value))}/>
    </Form.Field>
      <Form.Field>
      <label>Customer</label>
      <select onChange={(e) => setCustomer(e.target.value)}> 
        {customers.map((item)=> {
          return <option value={item.id} key={item.id}> {item.name} </option>
        })}
      </select>
    </Form.Field>

    <Form.Field>
      <label>Product</label>
      <select onChange={(e) => setProduct(e.target.value)}>
      {product.map((item)=> {
          return <option value={item.id} key={item.id}> {item.name} </option>
        })}
        </select>
    </Form.Field>

    <Form.Field>
      <label>Store</label>
      <select onChange={(e) => setStore(e.target.value)}>
      {store.map((item)=> {
          return <option value={item.id} key={item.id}> {item.name} </option>
        })}
        </select>
        
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => openCreateSalesModal(false)}>
          Cancel
        </Button>
        <Button
          content="create"
          labelPosition='right'
          icon='checkmark'
        onClick={createSale}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default SalesModal;