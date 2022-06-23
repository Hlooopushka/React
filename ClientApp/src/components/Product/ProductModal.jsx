import React, {useState, useEffect} from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

function ProductModal(props) {
const {showCreateModal, openCreateModal} = props;
const [Name, setName] = useState("");
const [Price, setPrice] = useState("");
const [icon, setIcon] = useState("")


const createProduct = () => {
    axios
    .post("Products/PostProduct", {
        Name: Name,
        Price: Price
    })
    .then(({ data }) => {
        openCreateModal(false)
        console.log(data);
        // this.setState({
        //   loading: false,
        // });
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
      <Modal.Header>Create product</Modal.Header>
      <Modal.Content>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Price</label>
      <input type="number" placeholder='Price' required min="0" step="0.05"  onChange={(e) => setPrice(e.target.value)}/>
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
        onClick={createProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ProductModal;