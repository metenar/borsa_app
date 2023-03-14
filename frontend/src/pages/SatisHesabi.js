import React from 'react'
import Navbar from '../components/Navbar'
import "./satisHesabi.css"

const SatisHesabi = ({datas,alimlar}) => {
  let totalAlinacak=0
  alimlar.forEach((item)=>{
    let price=(datas.find((hisse) => hisse.code === item.code).lastprice)
    totalAlinacak+=Math.floor((Math.floor((item.alimlarTotal + item.bedelTotal)*9/400))*price)
  })
    return (
      <div className="SatisHesabi">
        <Navbar />
        <div className="satisHesabi-tabloContainer">
          <table className="satisHesabi-tablo">
            <caption className="satisHesabi-title">Satis Durumu</caption>
            <colgroup>
              <col span="1" style={{ backgroundColor: "blue" }} />
            </colgroup>
            <thead className="header-group">
              <tr className="satis-header-row">
                <th>Senet Adi</th>
                <th>Katsayi</th>
                <th>Alis Adedi</th>
                <th>Toplam Adet</th>
                <th>Fiyat</th>
                <th style={{width:"10%"}}>Durum</th>
                <th>Satilacak Miktar</th>
                <th>Alinacak Para Miktari</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {alimlar.map((item) => (
                <tr key={item._id}>
                  <td>{item.code}</td>
                  <td>{item.katsayi}</td>
                  <td>{item.alimlarTotal}</td>
                  <td>{item.alimlarTotal + item.bedelTotal}</td>
                  <td>
                    {datas.find((hisse) => hisse.code === item.code).lastprice}{" "}
                    TL
                  </td>
                  <td>
                    {item.katsayi<=((datas.find((hisse) => hisse.code === item.code).lastprice *
                      (item.alimlarTotal + item.bedelTotal))/item.alimlarTotal) ? "SAT" : "BEKLE"}{" "}
                  </td>
                  <td>{Math.floor((item.alimlarTotal + item.bedelTotal)*9/400)}</td>
                  <td>{Math.floor((Math.floor((item.alimlarTotal + item.bedelTotal)*9/400))*(datas.find((hisse) => hisse.code === item.code).lastprice))} TL</td>
                </tr>
              ))}
              <tr>
                <td>Toplam Alinacak Para</td>
                <td>{`${totalAlinacak} TL`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default SatisHesabi
