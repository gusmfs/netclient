import { useContext } from "react";
import style from "./style.module.scss";
import { contactContext } from "../../../providers/contactContext";
import { MdEdit, MdDeleteOutline} from "react-icons/md"
import { EditContactModal } from "../../ContactFormEditModal";

export const ContactCard = ({contact}) => {
  const {deleteContact, setVisibleEdit, setEdited, visibleEdit, edited} = useContext(contactContext)
  return (
    <li className={style.li} >
      <div className={style.liContainer}>
        <h3>{contact.completeName}</h3>
        <span>{contact.email}</span>
        <span>
          {contact.phone}
        </span>
        <span>{contact.registerData}</span>
        <div className={style.buttonsContainer}>
          <button className={style.editButton} onClick={()=> {setVisibleEdit(true), setEdited(contact)}}>
            <MdEdit size={18}/>
          </button> 
          {visibleEdit && edited !== null ? <EditContactModal/> : null} 

          <button className={style.deleteButton} onClick={() => deleteContact(contact.id)} >
            <MdDeleteOutline size={18}/>
          </button> 
        </div>
      </div>
    </li>
  );
};
