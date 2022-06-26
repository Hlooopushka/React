import React from 'react'
import { Icon, Table, Button } from 'semantic-ui-react';

const DisplayTable = ({items , openModal, deleteItem}) => {
    return <Table celled basic className="ui celled striped table">
            <Table.Header>
             <Table.Row>
             <Table.HeaderCell>Name</Table.HeaderCell>
             <Table.HeaderCell>Addresse</Table.HeaderCell>
             <Table.HeaderCell>Actions</Table.HeaderCell>
             <Table.HeaderCell>Actions</Table.HeaderCell>
             </Table.Row>
            </Table.Header>
        <Table.Body>
        {items.length && items.map((item) => {
            return ( 
            <Table.Row key={item.id} >
              <Table.Cell className='classCell'>{item.name}</Table.Cell>
              <Table.Cell>{item.addresse}</Table.Cell>
              <Table.Cell>
                <Button 
                  color='yellow' 
                  onClick={() => openModal('edit', item.id)}>
                    <Icon name='edit'/>
                     EDIT
                    </Button>
              </Table.Cell>
              <Table.Cell>
                <Button 
                color='red' 
                onClick={() => deleteItem(item.id)}>
                  <Icon name='trash'/>
                  DELETE
                </Button>
                </Table.Cell>
            </Table.Row>
              )
          })}
        </Table.Body>
    </Table>
        
}

export default DisplayTable;