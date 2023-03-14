import axios from "axios"
import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import "./bedelGirisi.css"

const BedelGirisi = ({favorites}) => {
    
    const adet=useRef()
    const [code,setCode]=useState('')
    const data=favorites.sort((a, b) => a.localeCompare(b))
    const handleSubmit=async (e)=>{
        await axios.put(`/bedel/${code}`,{adet:adet.current.value})
    }
    return (
      <div className="BedelGirisi">
        <Navbar />
        <div className="bedelgirisi-container">
          <h2 className="title">Bedel Girisi</h2>
          <form className="bedelgirisi-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="code">Senet Kodu </label>
            <select
              id="code"
              className="bedelgirisi-select"
              onChange={(e) => setCode(e.target.value)}
            >
              <option>Senet Kodu</option>
              {data.map((code, i) => (
                <option value={code} key={i}>
                  {code}
                </option>
              ))}
            </select>
            <label htmlFor="adet">Bedelli/Bedelsiz Miktari </label>
            <input type="text" id="adet" ref={adet} />
            <button type="submit" className="bedelgirisi-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default BedelGirisi
