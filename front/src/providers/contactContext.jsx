import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const contactContext = createContext({});
export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([])
  const [visible, setVisible] = useState(false)
  const [edited, setEdited] = useState(null)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const token = localStorage.getItem("@TOKEN")
  const navigate = useNavigate()

  async function postContact(formData){
    try {
      const {data} = await api.post('/contact', formData, {
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      console.log(data);
      setContacts([...contacts, data])
      toast.success('Contact are registered!')
      setVisible(false)
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error);

    }
    
  }
  async function deleteContact (deleteId){
    try {
        await api.delete(`/contact/${deleteId}`, {
            headers:{
                Authorization : `Bearer ${token}` 
            }
        })
        const newContactList = contacts.filter(contact => contact.id !== deleteId)
        setContacts(newContactList)
        toast.success("Contact exclude successfully!")
        navigate("/dashboard")

    } catch (error) {
        console.log(error);
    }
}
  async function updateContact(formData){
    try {
      const {data} = await api.patch(`/contact/${edited.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const newContactList = contacts.map(contact => {
        if(contact.id === edited.id) {
          return data
        }else{
          return contact
        }
      })
      setContacts(newContactList)
      setVisibleEdit(false)
      toast.success('Contact updated successfully!')
      navigate("/dashboard")

    } catch (error) {
      toast.error('Is not a possible update this contact!')
    }
  }

  useEffect(() => {
    async function getAllContacts(){
      try{
        const {data} = await api.get('/contact', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setContacts(data);
        

      }catch(error){
        console.log(error);;
      }
    }
    if(token){
      getAllContacts()
    }
  }, []);


  return (
    <contactContext.Provider
      value={{
        postContact,
        contacts,
        setContacts,
        updateContact,
        deleteContact,
        navigate,
        visible,
        setVisible,
        edited,
        setEdited,
        visibleEdit,
        setVisibleEdit
        
      }}
    >
      {children}
    </contactContext.Provider>
  );
}