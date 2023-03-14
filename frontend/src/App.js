import axios from "axios"
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import SatisHesabi from "./pages/SatisHesabi";
import AlimGirisi from './pages/AlimGirisi';
import YillikBilanco from './pages/YillikBilanco';
import BedelGirisi from "./pages/BedelGirisi";
import HisseDetay from "./components/HisseDetay";
import { useDispatch, useSelector } from "react-redux";
import { gethisseler } from "./redux/hisseSlice";
import Temmettu from "./pages/Temmettu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import SatisGirisi from "./pages/SatisGirisi";
const favorites=[
  "GENTS", "THYAO", "EREGL", 
  "PETKM", "ASELS", "ISCTR", 
  "KCHOL", "ENKAI", "ISGYO", "ANSGR", 
  "ZOREN", "SISE"]
// const data=[
//   {"code":"ANSGR","lastprice":6.43,"rate":1},
//   {"code":"ASELS","lastprice":28.16,"rate":1},
//   {"code":"ENKAI","lastprice":15.57,"rate":1},
//   {"code":"EREGL","lastprice":35.18,"rate":1},
//   {"code":"GENTS","lastprice":3.84,"rate":1},
//   {"code":"ISCTR","lastprice":11.02,"rate":1},
//   {"code":"ISGYO","lastprice":12.30,"rate":1},
//   {"code":"KCHOL","lastprice":41.32,"rate":1},
//   {"code":"PETKM","lastprice":10.22,"rate":1},
//   {"code":"SISE","lastprice":18.07,"rate":1},
//   {"code":"THYAO","lastprice":37.64,"rate":1},
//   {"code":"ZOREN","lastprice":2.22,"rate":1}
// ]

function App() {
  const [alimlar, setAlimlar]=useState([])
  const [satislar, setSatislar]=useState([])
  const dispatch=useDispatch()
  const hisseler=useSelector(state=>state.hisse.hisse)
  const [datas,setDatas]=useState([])
  useEffect(() => {
    const getData = async () => {
      const reqData = {
        url: "https://api.collectapi.com/economy/hisseSenedi",
        method: "get",
        headers: {
          "content-type": "application/json",
          "authorization": `apikey ${process.env.REACT_APP_BORSA_API_KEY}`,
        },
      };
      const res = await axios(reqData);
      const intersection = res.data.result.filter(
        (e) => favorites.indexOf(e.code) !== -1
        );
      // intersection.forEach(item=>item.code=item.code.slice(0,5))
      intersection.sort((a, b) => a.code.localeCompare(b.code));
      setDatas(intersection);
      axios.get("/alimlar/total").then((resp) => {
        const data = resp.data.sort((a,b)=>a.code.localeCompare(b.code));
        setAlimlar(data);
      });
      axios.get("/satislar/total").then((resp) => {
        const data = resp.data.sort((a,b)=>a.code.localeCompare(b.code));
        setSatislar(data);
      });
    };
    getData();
  }, []);
  console.log(satislar)
  useEffect(()=>{    
      dispatch(gethisseler())   
  },[dispatch])  
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/bilanco" element={<YillikBilanco datas={datas} alimlar={alimlar} satislar={satislar}/>} />          
          <Route path="/login" element={<Login />} />          
          <Route path="/register" element={<Register />} />          
          <Route path="/alimlar" element={<AlimGirisi favorites={favorites} alimlar={alimlar} datas={datas}/>} />
          <Route path="/satislar" element={<SatisGirisi favorites={favorites} datas={datas} satislar={satislar}/>} />
          <Route path="/bedel" element={<BedelGirisi favorites={favorites} />} />
          <Route path="/satis" element={<SatisHesabi datas={datas} alimlar={alimlar} />} />
          <Route path="/temmettu" element={<Temmettu favorites={favorites} alimlar={alimlar} />} />
          <Route path="/detay/:code" element={<HisseDetay alimlar={alimlar} datas={datas} hisseler={hisseler}/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
