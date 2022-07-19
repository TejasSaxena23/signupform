import React from "react";
import './Form.css';

const Data = ({items}) => {
    return items.map(item=>(
        <ul className="list">
            <li key={item.phone}>{items.name}</li>
        </ul>
    ))
}

export default Data;