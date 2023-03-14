import React, { useState } from 'react'
import dateFormat from 'dateformat'

const AlimEdit = ({item,setIsAlimEditShow,isAlimEditShow,handleEdit, code}) => {
    const [adet,setAdet]=useState(item.adet)
    const [price,setPrice]=useState(item.price)
    const [date,setDate]=useState(item.date)
    const handleClick=()=>{
        const data={adet,price,date}
        handleEdit(item,data)
    }
    return (
      <div className="popup-container">
        <div className="popup-inner">
          <h3 className='popup-title'>{code}</h3>
          <div className="popup-wrapper">
            <label htmlFor="adet" className="popup-adet">
              Adet
            </label>
            <input
              type="text"
              id="adet"
              className="adet-input"
              placeholder={item.adet}
              onChange={(e)=>setAdet(e.target.value)}
            />
            <label htmlFor="price" className="popup-price">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="price-input"
              placeholder={item.price}
              onChange={(e)=>setPrice(e.target.value)}
            />
            <label htmlFor="date" className="popup-date">
              Date
            </label>
            <input
              type="text"
              id="date"
              className="date-input"
              placeholder={dateFormat(item.date,"mm/dd/yyyy")}
              onChange={(e)=>setDate(e.target.value)}
            />
            <button className="edit-button" onClick={handleClick}>Edit</button>
          </div>
          <button
            className="close-button"
            onClick={() => setIsAlimEditShow(!isAlimEditShow)}
          >
            x
          </button>
        </div>
      </div>
    );
}

export default AlimEdit
