import React, {useState, useEffect} from 'react'
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader'
import DisplayTable from '../NavItems/DisplayTable';
import CreditModal from '../NavItems/CreditModal';
import { Button } from 'semantic-ui-react';
import Error from '../NavItems/Error';
import Pagination from '../NavItems/Pagination';
import {setPages} from '../../utils/setPages'
import PageSelect from '../NavItems/PageSelect';


function Store () {
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState({visible: false, type: 'create'})
  const [store, setStore] = useState([]);
  const [items, setItems] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [error, setError] = useState({visible: false, message: ''})
  const [perPage, setPerPage] = useState(10)

  const fetchStore = async () => {
    const result = await axios
    .get("Stores/getStore")
    .catch((err) => {
      console.log(`No stores to display: ${err}`);
    })
    setStore(result.data)
  }

  const createStore = (name, address) => {
    setLoading(true)
    axios
    .post("Stores/postStore", {
        Name: name,
        Addresse: address
    })
    .then(({ data }) => {
        toggleModal('create')
        setLoading(false)
        fetchStore()
      })
      .catch(err => {
        toggleModal('create')
        setLoading(false)
        setError({visible: true, message: err.message})
        console.log(err);
      });
   
};

const editStore = (id, name, addresse) => {
  setLoading(true)
       axios.put(`Stores/PutStore/${id}`,{
        "id": id,
        "name": name,
        "addresse": addresse,
        "sales": []
      })
      .then(()=>{
          toggleModal('edit')
          setLoading(false)
          fetchStore()
      })
      .catch(err => {
              toggleModal('edit')
              setLoading(false)
              setError({visible: true, message: err.message})
              console.log(err);
         });
        }

const deleteItem = (id) => {
    setLoading(true)
      axios
      .delete(`Stores/DeleteStore/${id}`)
      .then(() => {
        setLoading(false)
        fetchStore()
      })
      .catch(err => {
            setLoading(false)
            setError({visible: true, message: err.message})
            console.log(err);
      });
}

const toggleModal = (type, id) => {
  setCurrentId(id)
  console.log(currentId);
  setModal((state) =>{
      return {visible: !state.visible, type}
   })
}

useEffect(() => {
  fetchStore()    
},[])

useEffect(()=>{
  if (store.length > 0) {changePage(1)}  
},[store])

useEffect(() => {
  changePage(1)
},[perPage])

const changePerPage = (e) => {
  setPerPage(parseInt(e.target.value))
  const tmpArray = store.slice(0 , parseInt(e.target.value))
  setItems(tmpArray)
}

const changePage = (page) => {
  let startItem = (page-1) * perPage;
  let endItem = startItem + perPage
  const tmpArray = store.slice(startItem , endItem)
  setItems(tmpArray)
}
useEffect(()=>{
  error.visible && setTimeout(()=>{setError({visible: false, message: ''})},5000)
},[error])

  if (loading) {return <BackgroundLoader/>}


  return (
    <>
    <CreditModal
        showModal={modal.visible}
        type={modal.type}
        id={currentId} 
        createItem={createStore}
        editItem={editStore}
        toggleModal={toggleModal}
        store={store}
        source="store"
        />
    <Button primary onClick={() => toggleModal('create')}>New Store</Button>
    {error.visible && <Error message={error.message}/>}
    <DisplayTable 
        items={items}
        openModal={toggleModal}
        deleteItem={deleteItem}
        />
        <div className="paginator-container">
            <PageSelect
            changePerPage={changePerPage}/>
            <Pagination
                changePage={changePage} 
                maxPages={setPages(store, perPage)}
                perPage={perPage}
            />

        </div>
    </>
    
)
}

export default Store;