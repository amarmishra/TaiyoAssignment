import React from 'react'
import { useSelector } from "react-redux/es/exports"
import ContactPanel from './ContactPanel'

interface Props{
 
    setEditContact:React.Dispatch<React.SetStateAction<null|IContact>>
}

const ContactList : React.FC<Props>= ({setEditContact}) => {

    //subscribe to redux store for contacts
    const contacts=useSelector((state:ContactState)=>state.contacts)
    // {console.log(contacts)}
  return (
    <>
    {
        contacts.map((contact)=>{
            return <div key={contact.id}><ContactPanel contact={contact} setEditContact={setEditContact}></ContactPanel></div>
        })
    }
    </>
  )
}

export default ContactList