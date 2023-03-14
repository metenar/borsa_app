import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import {useParams} from "react-router-dom";
import "./hisseDetay.css"
import Navbar from './Navbar';
import AlimEdit from './AlimEdit';
import BedelEdit from './BedelEdit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlim, deleteBedel, updateAlimlar, updateBedel } from '../redux/hisseSlice';

const HisseDetay = ({ datas }) => {
  const hisseler = useSelector((state) => state.hisse.hisse);
  const [hisse, setHisse] = useState({});
  const [isAlimEditShow, setIsAlimEditShow] = useState(false);
  const [isBedelEditShow, setIsBedelEditShow] = useState(false);
  const [item, setItem] = useState({});
  const { code } = useParams();
  const filteredDatas = datas.filter((e) => e.code === code)[0];
  useEffect(() => {
    const hisse1 = hisseler.find((hisse) => hisse.code === code);
    setHisse(hisse1);
  }, [code, hisseler]);
  const dispatch=useDispatch()
  const totalalimlar=hisse.alimlar?.reduce((a,{adet})=>a+adet,0)
  const totalBedel=hisse.bedelli_bedellsiz?.reduce((a,{adet})=>a+adet,0)
  const handleEdit = async (item, data) => {
    dispatch(updateAlimlar({code,item,data}))
    setIsAlimEditShow(!isAlimEditShow);
    setItem({});
  };

  const handleBedelEdit = async (item, data) => {
    dispatch(updateBedel({code,item,data}))
    setIsBedelEditShow(!isBedelEditShow);
    setItem({});
  };
  const handleEditAlim = (item) => {
    setIsAlimEditShow(true);
    setItem(item);
  };
  const handleEditBedel = (item) => {
    setIsBedelEditShow(true);
    setItem(item);
  };
  const handleDeleteAlim = async (id) => {
    dispatch(deleteAlim({code,id}))
  };
  const handleDeleteBedel = async (id) => {
    dispatch(deleteBedel({code,id}))
  };
  return (
    <div className="Detay">
      <Navbar />
      <div className="DetayContainer">
        <table className="alim-detay-table">
          <caption className="table-title">{code} Alim Tablosu</caption>
          <colgroup>
            <col span="1" style={{ backgroundColor: "blue" }} />
          </colgroup>
          <thead className="header-group">
            <tr className="header-row">
              <th>Alis Tarihi</th>
              <th>Alis Adedi</th>
              <th>Alis Fiyati</th>
              <th>Islem</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {hisse.alimlar?.map((item) => (
              <tr key={item._id}>
                <td>{dateFormat(item.date, "mm/dd/yyyy")}</td>
                <td>{item.adet}</td>
                <td>{item.price} TL</td>
                <td>
                  <div className="icons-container">
                    <button onClick={() => handleEditAlim(item)}>
                      <i
                        className="fas fa-pencil-alt icon"
                        style={{ color: "green" }}
                      ></i>
                    </button>
                    <button onClick={() => handleDeleteAlim(item._id)}>
                      <i
                        className="fas fa-trash-alt icon"
                        style={{ color: "red" }}
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="bedelli-detay-table">
          <caption className="table-title">
            {code} Bedelli/Bedelsiz Detay Tablosu
          </caption>
          <colgroup>
            <col span="1" style={{ backgroundColor: "blue" }} />
          </colgroup>
          <thead className="header-group">
            <tr className="header-row">
              <th>Alis Tarihi</th>
              <th>Alis Adedi</th>
              <th>Islem</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {hisse.bedelli_bedellsiz?.map((item) => (
              <tr key={item._id}>
                <td>{dateFormat(item.date, "mm/dd/yyyy")}</td>
                <td>{item.adet}</td>
                <td>
                  <div className="icons-container">
                    <button onClick={() => handleEditBedel(item)}>
                      <i
                        className="fas fa-pencil-alt icon"
                        style={{ color: "green" }}
                      ></i>
                    </button>
                    <button onClick={() => handleDeleteBedel(item._id)}>
                      <i
                        className="fas fa-trash-alt icon"
                        style={{ color: "red" }}
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="genel-detay-table">
          <caption className="genel-detay-table-title">Genel Durum</caption>
          <colgroup>
            <col span="1" style={{ backgroundColor: "blue" }} />
          </colgroup>
          <thead className="header-group">
            <tr className="header-row genelheader">
              <th>Toplam Alis Adedi</th>
              <th>Bedelli/Bedelsiz Toplami</th>
              <th>Toplam Hisse Miktari</th>
              <th>Suanki Degeri</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td>{totalalimlar}</td>
              <td>{totalBedel}</td>
              <td>
                {totalalimlar+totalBedel}
              </td>
              <td>
                {(
                  (totalalimlar +
                    totalBedel) *
                  filteredDatas?.lastprice
                ).toFixed(2)}{" "}
                TL
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isAlimEditShow && (
        <AlimEdit
          item={item}
          handleEdit={handleEdit}
          isAlimEditShow={isAlimEditShow}
          setIsAlimEditShow={setIsAlimEditShow}
          code={code}
        />
      )}
      {isBedelEditShow && (
        <BedelEdit
          item={item}
          handleBedelEdit={handleBedelEdit}
          isBedelEditShow={isBedelEditShow}
          setIsBedelEditShow={setIsBedelEditShow}
          code={code}
        />
      )}
    </div>
  );
};

export default HisseDetay;
