import axios from "axios"
// import dateFormat from 'dateformat'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Hissebar from "../components/Hissebar"
import "./satisGirisi.css"

const SatisGirisi = ({favorites,datas}) => {
    const [hisse,setHisse]=useState({})
    const [satisFiyati,setSatisFiyati]=useState(null)
    const adet=useRef()
    const tarih=useRef()
    const [code,setCode]=useState('')
    useEffect(()=>{
        const findHisse= async()=>{
            const resp=await axios(`/find/${code}`)
            const lastDate=resp.data.satislar.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            setHisse(lastDate)
        }
        findHisse()
    },[code])
    const data=favorites.sort((a, b) => a.localeCompare(b))
    let hissedate=new Date(hisse?.date)
    let suandate=new Date();
    let year2=suandate.getFullYear()
    let month2=suandate.getMonth();
    let year1=hissedate.getFullYear()
    let month1=hissedate.getMonth()
    let monthdif=(year2-year1)*12+(month2-month1)
    let lastPrice=hisse?.price
    while(monthdif>0){
        lastPrice+=lastPrice*0.1
        monthdif--
    }
    // const ddate=dateFormat(hisse?.date,"mm/dd/yyyy")
    const handleSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`/satislar/${code}`,{adet:adet.current.value,price:satisFiyati,date:tarih.current.value})
    }
    return (
      <div className="SatisGirisi">
        <Navbar />
        <Hissebar datas={datas}/>
        <div className="satisgirisi-container">
          <h2 className="title">Satis Girisi</h2>          
          <form className="satisgirisi-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="code">Senet Kodu </label>
            <select
              id="code"
              className="satisgirisi-select"
              onChange={(e) => setCode(e.target.value)}
            >
              <option>Senet Kodu</option>
              {data.map((code, i) => (
                <option value={code} key={i}>
                  {code}
                </option>
              ))}
            </select>
            <label htmlFor="fiyat">Satis Fiyati </label>
            <input
              type="text"
              id="fiyat"
              onChange={(e) => setSatisFiyati(e.target.value)}
            />
            <label htmlFor="adet">Satis Adedi </label>
            <input type="text" id="adet" ref={adet} />
            <label htmlFor="tarih">Satis Tarihi </label>
            <input type="date" id="tarih" ref={tarih} />
            <button type="submit" className="satisgirisi-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default SatisGirisi
