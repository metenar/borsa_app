import React, { useState } from 'react'
import dateFormat from 'dateformat'

const BedelEdit = ({item,setIsBedelEditShow,isBedelEditShow,handleBedelEdit, code}) => {
    const [adet,setAdet]=useState(item.adet)
    const [date,setDate]=useState(item.date)
    const handleClick=()=>{
        const data={adet,date}
        handleBedelEdit(item,data)
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
            onClick={() => setIsBedelEditShow(!isBedelEditShow)}
          >
            x
          </button>
        </div>
      </div>
    );
}

export default BedelEdit
