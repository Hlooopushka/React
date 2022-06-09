import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function CustomerModal(props) {
const {showCreateModal, openCreateModal} = props;
const [Name, setName] = useState("");
const [Addresse, setAddresse] = useState("");
const [icon, setIcon] = useState("")


const createCustomer = () => {
    axios
    .post("Customers/PostCustomer", {
        Name: Name,
        Addresse: Addresse
    })
    .then(({ data }) => {
        openCreateModal(false)
        console.log(data);
        this.setState({
          loading: false,
        });
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
      <label>Name</label>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Addresse</label>
      <input placeholder='Addresse' onChange={(e) => setAddresse(e.target.value)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => openCreateModal(false)}>
          Cancel
        </Button>
        <Button
          content="create"
          labelPosition='right'
          icon='checkmark'
        onClick={createCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CustomerModal;