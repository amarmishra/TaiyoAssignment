import { useEffect, useState,useRef } from "react"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { addContact,editContact as editContactAction } from "../store/actions/contacts"
import { PlaceHolderAnimation } from '../assets/js/form_animation'
import styles from '../assets/css/contact_form.module.css'




interface Props{
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>,
    editContact:null | IContact,
    setEditContact:React.Dispatch<React.SetStateAction<editCon>>
}
export const ContactForm: React.FC<Props> = ({setShowForm,editContact,setEditContact})=>{

    //dispatch hook for react-redux
    const dispatch=useDispatch()

    const inputFirstNameRef=useRef(null)
    const inputLastNameRef=useRef(null)
    let firstAnimationObject=useRef<PlaceHolderAnimation | null >(null) ,lastAnimationObject=useRef<PlaceHolderAnimation| null>(null)

    let formDataIntial={
        firstName:'',
        lastName:'',
        active:true,
        id:''
    }

    const [formData,setFormData]=useState<IContact>(formDataIntial)

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        e.stopPropagation()
        if(e.target.name==='status')
        {
            setFormData({...formData,
                "active" :  e.target.value==='true' ? true : false
            })
        }else{
            setFormData(
                {...formData,
                    [e.target.name] : e.target.value
                })
        }
        
    }

   
    useEffect(()=>{

        if(editContact){
            setFormData(editContact)
        }

        
        
       
    },[editContact])


    useEffect(()=>{

        
        
        if(inputLastNameRef.current && inputFirstNameRef.current){

            // titleAnimationObject=placeHolderAnimation(inputRef.title.current,"Your title here.");
            // bodyPlaceHolderAnimantionId=placeHolderAnimation(inputRef.body.current,"Your description here.");

            firstAnimationObject.current=new PlaceHolderAnimation(inputFirstNameRef.current,"First Name",40);
            lastAnimationObject.current=new PlaceHolderAnimation(inputLastNameRef.current,"Last Name",50);
            // below code will automatically change with state of formData
            //no need to add dependency from you side let react handle it
            //learning never put state variable in the depedency
            if(formData.firstName==='' && !firstAnimationObject.current.animationId ){
                
               firstAnimationObject.current.start()
                
            }
          
            // if(formData.title!=='' && titleAnimationObject.current.animationId){
            //     console.log("Cancelling event id",)
            //     titleAnimationObject.current.stop()
            // }
           
            if(formData.lastName==='' && !lastAnimationObject.current.animationId ){
                
                lastAnimationObject.current.start()
                 
            }
           
           
             
             
        }else{
            //BIGGGGGGGGGGGGG ****JUGAAD TRYING TO RERENDER THE FORM(only one time) SO THAT inputRef has value
            if(!editContact){
                setFormData(formDataIntial)
            }
        }
       
        
         return ()=>{
             /**Remove event listeners from inputRef DOM nodes */
         
         }


    },[])

   

    const submitForm= (e:React.SyntheticEvent)=>{
        
        e.preventDefault()
        
        //can add ToastProvider for notifications if title is empty(currently required in form)
    
        //get userId from AuthProvider
        const userId=1
        if(editContact){
            
            //editContact action is dispatched
            dispatch(editContactAction({...formData,id:editContact.id}))   
            
            setEditContact(null)
           
        }
        else{   
                //addContact action is dispatched
                dispatch(addContact({...formData}))
        }
        

        //  await TaskProvider.addTask(title,body,userId)
        setFormData(formDataIntial)
        setShowForm(false)
        return
        
    }
   
    
            return <>
            <div  className={styles["main"]}>
                <form onSubmit={submitForm} >
                    <input ref={inputFirstNameRef}  name='firstName' onChange={handleChange} value={formData.firstName} required></input>
                    <input ref={inputLastNameRef}  name='lastName' onChange={handleChange} value={formData.lastName} style={{resize:"none",overflow:"auto"}} ></input>
                    
                    <div style={{display:"flex",justifyContent:'space-around',width:'50%'}}>
                        <div style={{width:'fit-content'}}>
                            <input style={{width:'auto'}} type="radio" id="active" name="status" value="true" onChange={handleChange} checked={formData.active===true} ></input>
                            <label htmlFor="active">Active</label>
                        </div>
                        <div style={{width:'fit-content'}}>
                            <input style={{width:'auto'}} type="radio" id="inactive" name="status" value="false" onChange={handleChange} checked={formData.active===false}></input>
                            <label htmlFor="inactive">Inactive</label></div>
                    </div>
                    <div className={styles["button-panel"]}>
                        <button type="submit" >{editContact ? 'Edit':'Add'}</button>
                        <button type="button" onClick={ editContact ? ()=>{  setFormData(formDataIntial); setEditContact(null);}: ()=>setShowForm(false)}>Reject</button>
                    </div>
                
                </form>
            </div>
            </>
        
    
}