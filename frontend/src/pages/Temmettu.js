import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import "./temmettu.css"

const Temmettu = ({favorites,alimlar}) => {
    const [code,setCode]=useState('')
    const [sonuc,setSonuc]=useState(0)
    const oran=useRef()
    const hisse=alimlar.find((item)=>item.code===code)
    console.log(hisse);
    const data=favorites.sort((a, b) => a.localeCompare(b))
    const handleSubmit=(e)=>{
        e.preventDefault()
        let res=hisse?.alimlarTotal+hisse?.bedelTotal
        setSonuc(((oran.current.value*res)/100).toFixed(2))
    }
  return (
    <div className="Temmettu">
    <Navbar />
    <div className="Temmettu-container">
    <h2 className="title">Temmettu Hesabi</h2>
    {hisse && (
            <div className="infocontainer">
                <span className="adet">Eldeki Senet Miktari :{hisse?.alimlarTotal+hisse?.bedelTotal}</span>
            </div>
          )}
      <form className="Temmettu-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="code">Senet Kodu </label>
        <select
          id="code"
          className="Temmettu-select"
          onChange={(e) => setCode(e.target.value)}
        >
          <option>Senet Kodu</option>
          {data.map((code, i) => (
            <option value={code} key={i}>
              {code}
            </option>
          ))}
        </select>
        <label htmlFor="oran">Temmettu Orani % </label>
        <input
          type="text"
          id="toplam"  
          ref={oran}       
        />
        <button type="submit" className="Temmettu-button">
          Hesapla
        </button>
      </form>
      {sonuc >0 ? (<div className="sonuc-container">
        <span className="sonuc">Elde edilen Kazanc: {sonuc} TL</span>
      </div>) : null}
      </div>
    </div>
  ); 
};

export default Temmettu;
