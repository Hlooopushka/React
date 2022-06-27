import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

const SalesModal = ({showCreateModal, openCreateSalesModal, fetchSales, customers,product, store, id, type}) => {
const [Customer, setCustomer] = useState('');
const [Product, setProduct] = useState('');
const [Store, setStore] = useState('');
const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
//const [icon, setIcon] = useState("");

const editSales = async (id) => {



  await axios.put(`Sales/PutSales/${id}`,{
    "id":id,
    "customerId": Customer,
    "productId": Product,
    "storeId": Store,
    "sales": [],
    dateSold: date,
    "customer": null,
        "product": null,
        "store": null
        
  })
  .then(()=>{ 
    fetchSales();
    openCreateSalesModal(false);
  })
        .catch(err => {
          console.log(err);
     });
  };

const createSale = () => {
    axios
    .post("Sales/PostSales", {
        customerId: Customer,
        productId: Product,
        storeId: Store,
        dateSold: date,
      
    })
    .then(() => {
        fetchSales();
        openCreateSalesModal(false)
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   loading: true,
        // });
      });
};

useEffect(()=> {
if (customers.length > 0) {setCustomer(customers[0].id)}
if (product.length > 0) {setProduct(product[0].id)}
if (store.length > 0) {setStore(store[0].id)} 
},[customers, product,store])


  return (
    <Modal open={showCreateModal}>
      <Modal.Header className="modal-header">{type} Sale</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
      <label>Date sold</label>
      <input type="Date" value={date} onChange={(e) => setDate(e.target.value)}/>
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
        {type === 'create' ? <Button
          content="create"
          labelPosition='right'
          icon='checkmark'
        onClick={createSale}
          positive
        />
        :
         <Button
          content="edit"
          labelPosition='right'
          icon='checkmark'
          onClick={()=>editSales(id)}
          positive
        />}
        
         
      </Modal.Actions>
    </Modal>
  );
}

export default SalesModal;