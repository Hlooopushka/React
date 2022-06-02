import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditCustomer(props) {
const {showEditModal, openEditModal, closeEditModal} = props;
const [name, setName] = useState(props.name);
const [addresse, setAddresse] = useState(props.addresse);
const [icon, setIcon] = useState('');

const editCustomer = async (id) => {
await axios.put(`Customers/PutCustomer/${id}`,{
  "id": id,
  "name": name,
  "addresse": addresse,
  "sales": []
})
.then(()=>{closeEditModal()})
      .catch(err => {
        console.log(err);
   });
};
  return (
    <Modal open={showEditModal}>
      <Modal.Header>edit Customer number {props.id}
      </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name"
            onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Addresse</label>
          <input placeholder="Addresse"
            onChange={(e) => setAddresse(e.target.value)}/>
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
          onClick={()=>editCustomer(props.id)}
          positive
        />
    </Modal.Actions> 
    </Modal>
  );
}

export default EditCustomer;