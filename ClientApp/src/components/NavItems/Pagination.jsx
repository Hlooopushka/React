import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';
// import "./table.css";

const Pagination = ({maxPages, changePage, perPage}) => {

const [pages,setPages] = useState([1]);
const [limit, setLimit]=useState(perPage);

function updatePages() {
    if (maxPages >1) {
      const items = [];
      for (let i=1; i <= maxPages; i++) {
        items.push(i)
      } 
      setPages(items);
    } else {setPages([1])}
}

  useEffect(() => {
    setPages([])
    updatePages()
    
  }, [maxPages, limit])

  useEffect(() => {
    setLimit(perPage)
    
  }, [perPage])
  
  return <div className="paginator">
            {pages.map((page,index)=>{
              return <Button primary  key={index} onClick={()=>
                 changePage(page)}>{page}</Button>
            })}
        </div>
}

export default Pagination;

