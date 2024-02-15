import logo from "../../assets/logo.png"
import { clientContext } from "../../providers/clientContext";
import { useContext } from "react";
import style from "./style.module.scss";
export const Header = () => {
    const {  client ,clientLogout } = useContext(clientContext)
    return(
        <header className={style.headerContainer}>
                
                <img className={style.img} src={logo} alt="logo" />    
                
                <div  className={style.topright}>
                    <div className={style.clientName}>
                        {client && (<p>{client.completeName.charAt(0)}</p>)}
                    </div>
                    <button className={style.buttonExit} onClick={() => clientLogout()}>Logout</button>
                </div>
        </header>
    )
}