import React, {useState, useEffect} from 'react'
import axios from "axios";
import BackgroundLoader from '../NavItems/BackgroundLoader'
import DisplayTable from '../NavItems/DisplayTable';
import CreditModal from '../NavItems/CreditModal';
import { Button } from 'semantic-ui-react';
import Error from '../NavItems/Error'
import Pagination from '../NavItems/Pagination';
import {setPages} from '../../utils/setPages'
import PageSelect from '../NavItems/PageSelect';

function Customer () {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState({visible: false, type: 'create'})
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [error, setError] = useState({visible: false, message: ''})
    const [perPage,setPerPage] = useState(10)

    const fetchCustomers = async () => {
        const result = await axios
        .get("Customers/GetCustomer")
        .catch(err => {
            console.log(`No customers to display: ${err}`);
        })
        setCustomers(result.data)
    }

    const createCustomer = (name, address) => {
        setLoading(true)
        axios
        .post("Customers/PostCustomer", {
            Name: name,
            Addresse: address
        })
        .then(() => {
            toggleModal('create')
            setLoading(false)
            fetchCustomers()
          })
          .catch(err => {
            toggleModal('create')
            setLoading(false)
            setError({visible: true, message: err.message})
            console.log(err);
          });
       
    };

    const editCustomer = (id, name, addresse) => {
    setLoading(true)
         axios.put(`Customers/PutCustomer/${id}`,{
          "id": id,
          "name": name,
          "addresse": addresse,
          "sales": []
        })
        .then(()=>{
            toggleModal('edit')
            setLoading(false)
            fetchCustomers()
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
      .delete(`Customers/DeleteCustomer/${id}`)
      .then(() => {
        setLoading(false)
        fetchCustomers()
      })
      .catch(err => {
            setLoading(false)
            setError({visible: true, message: err.message})
            console.log(err);
      });
}

const toggleModal = (type, id) => {
    setCurrentId(id)
    setModal((state) =>{
        return {visible: !state.visible, type}
     })
 }

 useEffect(() => {
    fetchCustomers()
},[])

useEffect(()=>{
    if (customers.length > 0) {changePage(1)}  
},[customers])

useEffect(() => {
    changePage(1)
},[perPage])

const changePerPage = (e) => {
    setPerPage(parseInt(e.target.value))
    const tmpArray = customers.slice(0 , parseInt(e.target.value))
    setItems(tmpArray)
}

const changePage = (page) => {
    let startItem = (page-1) * perPage;
    let endItem = startItem + perPage
    const tmpArray = customers.slice(startItem , endItem)
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
            createItem={createCustomer}
            editItem={editCustomer}
            toggleModal={toggleModal}
            customers={customers}
            />
        <Button primary onClick={() => toggleModal('create')}>New Customer</Button>
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
                maxPages={setPages(customers, perPage)}
                perPage={perPage}
            />
        </div>
           
        </>
        
    )
}

export default Customer;