
import "./hissebar.css"


const Hissebar = ({datas}) => {
    
    return (
        <div className="Hissebar">
            <div className="Hissebar-container">
                {datas.map((item,id)=>(
                    <div className="item-container" key={id}>
                        <span className="code">{item.code}</span>
                        <span className={item.rate>=0 ? "rate-green" : "rate-red"}>{item.lastprice}</span>
                        <span className="arrow"> 
                            {item.rate>=0 ? <i className="fas fa-caret-up fa-lg" style={{color:"green"}}></i> : <i className="fas fa-caret-down fa-lg" style={{color:"red"}}></i>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hissebar
