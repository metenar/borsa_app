import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom"
import "./genelBilanco.css"

const GenelBilanco = ({ datas, alimlar, satislar }) => {
  // console.log(datas)
  const [toplamHarcama, setToplamHarcama] = useState(0);
  let total = 0;
  let price = 0;
  let satis = 0;
  alimlar.forEach((item) => {
    price = datas.find((hisse) => hisse.code === item.code).lastprice;
    satis = satislar.find((hisse) => hisse.code === item.code).satislarTotal;
    total += (item.alimlarTotal+item.bedelTotal-satis) * price;
  });
  useEffect(() => {
    const getTumHisseler = async () => {
      const resp = await axios.get("/harcama");
      setToplamHarcama(+resp.data);
    };
    getTumHisseler();
  }, []);
  return (
    <div className="GenelBilanco">
      <div className="GenelBilanco-container">
        <table className="bilanco_table">
          <caption className="table-title">Genel Bilanco</caption>
          <colgroup>
            <col span="1" style={{ backgroundColor: "blue" }} />
          </colgroup>
          <thead className="header-group">
            <tr className="header-row">
              <th>Senet Adi</th>
              <th>Adet</th>
              <th>Bedelli/Bedelsiz</th>
              <th>Satislar</th>
              <th>Toplam Adet</th>
              <th>Fiyat</th>
              <th>Toplam Deger</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {alimlar.map((item) => (
              <tr key={item._id}>
                <td
                  style={{
                    backgroundColor: "blue",
                    textAlign: "left",
                    padding: "5px 10px",
                  }}
                >
                  <NavLink
                    to={`/detay/${item.code}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {item.code}
                  </NavLink>
                </td>
                <td>{item.alimlarTotal}</td>
                <td>{item.bedelTotal}</td>
                <td>
                  {satislar.find((hisse) => hisse.code === item.code).satislarTotal}
                </td>
                <td>{item.alimlarTotal + item.bedelTotal-(satislar.find((hisse) => hisse.code === item.code).satislarTotal)}</td>
                <td>
                  {datas.find((hisse) => hisse.code === item.code).lastprice} TL
                </td>
                <td>
                  {(
                    datas.find((hisse) => hisse.code === item.code).lastprice *
                    (item.alimlarTotal + item.bedelTotal-(satislar.find((hisse) => hisse.code === item.code).satislarTotal))
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                  TL
                </td>
              </tr>
            ))}
            <tr>
              <td
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "left",
                  padding: "5px 10px",
                }}
              >
                Toplam Deger
              </td>
              <td colSpan={6}>{total.toLocaleString("en-US", { minimumFractionDigits: 2 })} TL</td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "left",
                  padding: "5px 10px",
                }}
              >
                Toplam Harcama
              </td>
              <td colSpan={6}>{toplamHarcama.toLocaleString("en-US", { minimumFractionDigits: 2 })} TL</td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "left",
                  padding: "5px 10px",
                }}
              >
              {total > toplamHarcama ? <span>Kar</span>: <span>Zarar</span>}
              </td>
              <td
                colSpan={6}
                className={total > toplamHarcama ? "kar" : "zarar"}
              >
                {Math.abs(toplamHarcama - total).toLocaleString("en-US", { minimumFractionDigits: 2 })} TL
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenelBilanco
