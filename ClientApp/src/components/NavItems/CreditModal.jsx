import React, {useState, useEffect} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';


function CreditModal({type, id, createItem, editItem, showModal, toggleModal, customers, store, source}) {

const [name, setName] = useState("");
const [addresse, setAddresse] = useState("");
const [error, setError] = useState({visible: false, msg: 'Please make sure that both Name and Address are not empty'})

const getValues = (id) => {
  if (customers)
  {const item = customers.filter((item) => item.id === id)
    return item[0]}

  if(store)
  {const item = store.filter((item) => item.id === id)
    return item[0]}
} 


const handleClick = () => {
  if (!name || !addresse) {setError({...error,visible: true})}
  else {
    type === 'create' ? createItem(name, addresse) : editItem(id, name, addresse)
  setName("");
  setAddresse("");
  }
}

const cancelClick = () => {
  setName("");
  setAddresse("");
  toggleModal('create')
}

useEffect(() => {
  if (error.visible) {setTimeout(() => {setError({...error, visible: false})}, 5000)}
}, [error])

useEffect(()=>{
  if (id) {
const item = getValues(id);
  setName(item.name);
  setAddresse(item.addresse)
  }
},[id])

  return (
    <Modal open={showModal}>
      <Modal.Header className="modal-header">{type} {source}</Modal.Header>
      <Modal.Content>
      <Form>
        {error.visible && <h4 style={{'color':"red"}}>{error.msg}</h4>}
    <Form.Field>
      <label>NAME</label>
      <input value={name} onChange={(e) => setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>ADDRESS</label>
      <input value={addresse} onChange={(e) => setAddresse(e.target.value)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>cancelClick()}>
          Cancel
        </Button>
        <Button
          content={type}
          labelPosition='right'
          icon='checkmark'
          onClick={()=>handleClick()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CreditModal;
