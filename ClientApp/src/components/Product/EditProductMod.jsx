import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditProductMod(props) {
const {showEditModal, openEditModal, closeEditModal} = props;
const [name, setName] = useState(props.name);
const [price, setPrice] = useState(props.price);
const [icon, setIcon] = useState('');

const editProduct = async (id) => {
await axios.put(`Products/PutProduct/${id}`,{
  "id": id,
  "name": name,
  "price": price,
  "sales": []
})
.then(()=>{closeEditModal()})
      .catch(err => {
        console.log(err);
   });
};
  return (
    <Modal open={showEditModal}>
      <Modal.Header>edit Product
         {/* number {props.id} */}
      </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name"
            onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}/>
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions> 
        <Button color='black' onClick={() => closeEditModal(true)}>
          Cancel
        </Button>
        <Button
          content="edit"
          labelPosition='right'
          icon='checkmark'
          onClick={()=>editProduct(props.id)}
          positive
        />
    </Modal.Actions> 
    </Modal>
  );
}

export default EditProductMod;