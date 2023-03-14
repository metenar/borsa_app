import GenelBilanco from '../components/GenelBilanco'
import Hissebar from '../components/Hissebar'
import Navbar from '../components/Navbar'
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom'
import "./yillikBilanco.css"


const YillikBilanco = ({datas,alimlar,satislar}) => {
    const [user,loading]  =useAuthState(auth)
    const navigate=useNavigate()
    if(loading) return <h1 className="loading">Loading...</h1>
    if(!user) navigate('/')
    if(user)
    return (
        <div className='yillikBilanco-container'>
            <Navbar />
            <Hissebar datas={datas}/>
            <GenelBilanco datas={datas} alimlar={alimlar} satislar={satislar}/>
        </div>
    )
}

export default YillikBilanco
