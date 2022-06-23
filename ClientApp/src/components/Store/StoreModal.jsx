import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function StoreModal(props) {
const {showStoreModal, openCreateModal, fetchStore} = props;
const [Name, setName] = useState("");
const [Addresse, setAddresse] = useState("");
const [icon, setIcon] = useState("")


const createStore = () => {
    axios
    .post("Stores/PostStore", {
        Name: Name,
        Addresse: Addresse
    })
    .then(({ data }) => {
        fetchStore();
        openCreateModal(false)
        console.log(data);
        
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: true,
        });
      });
};
  return (
    <Modal open={showStoreModal}>
      <Modal.Header>Create store</Modal.Header>
      <Modal.Content>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' onChange={(e) => 
        setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Addresse</label>
      <input placeholder='Addresse' onChange={(e) => 
        setAddresse(e.target.value)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => 
            openCreateModal(false)}>
          Cancel
        </Button>
        <Button
          content="create"
          labelPosition='right'
          icon='checkmark'
        onClick={createStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default StoreModal;