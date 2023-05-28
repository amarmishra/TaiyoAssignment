import React from 'react'
import {useDispatch} from 'react-redux'
import styles from '../assets/css/contact_panel.module.css'
import { deleteContact } from '../store/actions/contacts'

interface Props{
    contact:IContact,
    setEditContact:React.Dispatch<React.SetStateAction<null|IContact>>
}

const ContactPanel: React.FC<Props> = ({contact,setEditContact}) => {

    const {firstName,lastName,active}=contact

    const dispatch=useDispatch()
    
  return (
    <div className={styles['container']}>
        <div className={styles['content']}><span>{firstName+" "+lastName}</span><span>{active?'Active':'Inactive'}</span></div>
        <div className={styles['action-panel']}>
            <button className={styles['edit']} onClick={(e)=>setEditContact(contact)}>Edit</button>
            <button onClick={(e)=>dispatch(deleteContact(contact))}>Delete</button></div>
    </div>
  )
}

export default ContactPanel