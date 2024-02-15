import { useContext } from "react";
import { ContactCard } from "./ContactCard";
import { contactContext } from "../../providers/contactContext";
import style from "./style.module.scss";

export const ContactList = ({contacts}) => {
  return (
    <section>
      <div>
        <ul className={style.ul}>
          {contacts?.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
            />
          ))}
          
        </ul>
      </div>
    </section>
  );
};