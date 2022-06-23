import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditSales(props) {
const {showEditModal, openEditSalesModal, closeEditModal} = props;
const [Date, setDate] = useState(props.Date);
const [customer, setCustomer] = useState(props.customer);
const [Product, setProduct] = useState(props.product);
const [Store, setStore] = useState(props.store);
const [icon, setIcon] = useState('');

const EditSales = async (id) => {
await axios.put(`Sales/PutSales/${id}`,{
  "id": id,
  "customer": customer,
  "product": Product,
  "store": Store,
  "sales": []
})
.then(()=>{closeEditModal()})
      .catch(err => {
        console.log(err);
   });
};
  return (
    <Modal open={showEditModal}>
      <Modal.Header>edit Sale number {props.id}
      </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <label>Date sold</label>
          <input type="Date" onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('en-US'))}/>
          </Form.Field>

          <Form.Field>
          <label>Customer</label>
          <input 
            onChange={(e) => setCustomer(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Product</label>
          <input placeholder={(props.Product)}
            onChange={(e) => setProduct(e.target.value)}/>
        </Form.Field>

        <Form.Field>
          <label>Store</label>
          <input placeholder={(props.Store)}
            onChange={(e) => setStore(e.target.value)}/>
        </Form.Field>

      </Form>
    </Modal.Content>
    <Modal.Actions> 
        <Button color='black' onClick={() => 
          closeEditModal(true)}>
          Cancel
        </Button>
        <Button
          content="edit"
          labelPosition='right'
          icon='checkmark'
          onClick={()=>EditSales(props.id)}
          positive
        />
    </Modal.Actions> 
    </Modal>
  );
}

export default EditSales;