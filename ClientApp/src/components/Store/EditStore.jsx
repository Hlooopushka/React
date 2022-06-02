import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function EditStore(props) {
const {storeEditModal, openEditModal, closeEditModal} = props;
const [name, setName] = useState(props.name);
const [addresse, setAddresse] = useState(props.addresse);
const [icon, setIcon] = useState('');

const EditStoreModal = async (id) => {
await axios.put(`Stores/PutStore/${id}`,{
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
    <Modal open={storeEditModal}>
      <Modal.Header>edit Store number {props.id}
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
          onClick={()=>EditStoreModal(props.id)}
          positive
        />
    </Modal.Actions> 
    </Modal>
  );
}

export default EditStore;