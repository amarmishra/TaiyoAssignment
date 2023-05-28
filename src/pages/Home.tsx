import { useEffect, useReducer, useRef, useState } from "react"
import { ContactForm } from "../components/ContactForm"
import styles from '../assets/css/home.module.css'
import ContactList from "../components/ContactList"
import { useSelector } from "react-redux/es/exports"



export const Home=()=>{
    
    //manage showState for form 
    const [showForm,setShowForm]=useState(false)

    //manage edit state for form
    
    const [editContact,setEditContact]=useState<editCon>(null)
    

    const contacts=useSelector((state:ContactState)=>state.contacts)
    

    

    useEffect(()=>{
      if(editContact){
        setShowForm(true)
      }
      else{
        setShowForm(false)
      }
      
    },[editContact])
    
    return <>
   
        <button type="button" onClick={()=>setShowForm(true)} disabled={showForm} className={styles["add-contact-button"]}>Create Contact</button>
        {showForm ? <ContactForm setShowForm={setShowForm} editContact={editContact} setEditContact={setEditContact} ></ContactForm> : null}
        {contacts ? <ContactList setEditContact={setEditContact}></ContactList> :<div style={{height:'100vh',background:'#333'}}>No contacts to show</div>}
     
    </>
}