import axios from "axios"
import dateFormat from 'dateformat'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Hissebar from "../components/Hissebar"
import "./alimgirisi.css"

const AlimGirisi = ({favorites,datas}) => {
    const [hisse,setHisse]=useState({})
    const [alisFiyati,setAlisFiyati]=useState(null)
    const adet=useRef()
    const tarih=useRef()
    const [code,setCode]=useState('')
    useEffect(()=>{
        const findHisse= async()=>{
            const resp=await axios(`/find/${code}`)
            const lastDate=resp.data.alimlar.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
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
    const ddate=dateFormat(hisse?.date,"mm/dd/yyyy")
    const handleSubmit=async (e)=>{
        await axios.put(`/alimlar/${code}`,{adet:adet.current.value,price:alisFiyati,date:tarih.current.value})
    }
    return (
      <div className="AlimGirisi">
        <Navbar />
        <Hissebar datas={datas}/>
        <div className="alimgirisi-container">
          <h2 className="title">Alim Girisi</h2>
          {hisse?.date && (
            <div className="tavsiyecontainer">
              <div className="tavsiye-left">
                <span className="lastdate">Son Alim Tarihi :{ddate}</span>
                <span className="lastprice">
                  Son Alis Fiyati :{hisse?.price}
                </span>
              </div>
              <div className="tavsiye-right">
                <span className="lastcount">
                  Son Alim Miktari :{hisse?.adet}
                </span>
                <span className="maxAlisFiyati">
                  MaxAlis Fiyati :{lastPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
          <form className="alimgirisi-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="code">Senet Kodu </label>
            <select
              id="code"
              className="alimgirisi-select"
              onChange={(e) => setCode(e.target.value)}
            >
              <option>Senet Kodu</option>
              {data.map((code, i) => (
                <option value={code} key={i}>
                  {code}
                </option>
              ))}
            </select>
            <label htmlFor="fiyat">Alis Fiyati </label>
            <input
              type="text"
              id="fiyat"
              onChange={(e) => setAlisFiyati(e.target.value)}
            />
            {alisFiyati &&
              (alisFiyati > lastPrice ? (
                <span className="uyari">Alma</span>
              ) : (
                <span className="onay">Alabilirsin</span>
              ))}
            <label htmlFor="adet">Alis Adedi </label>
            <input type="text" id="adet" ref={adet} />
            <label htmlFor="tarih">Alis Tarihi </label>
            <input type="date" id="tarih" ref={tarih} />
            <button type="submit" className="alimgirisi-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default AlimGirisi
