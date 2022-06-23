import React from 'react'

const PageSelect = ({changePerPage}) => {
    return <div className="page-select" onChange={changePerPage}>
        <select>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
        </select>
    </div>
}

export default PageSelect