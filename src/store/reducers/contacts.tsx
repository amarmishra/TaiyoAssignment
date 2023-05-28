import {addCon,delCon,editCon,addContact,deleteContact,editContact} from '../actions/contacts'

export interface Contact{
    firstName:string,
    lastName:string,
    active:boolean,
    id:string
}
const intitialValue:ContactState={
  contacts:[]}


function contactReducer(state: ContactState=intitialValue,action: ContactAction):ContactState{
    switch(action.type){
   
      case addCon:
        return {
          ...state,
          contacts: state.contacts.concat({...action.payload,id:`${action.payload.firstName}-${Date.now()}`})
        }
          
       
       
      case delCon:
        return {
          ...state,
          contacts: state.contacts.filter((contact)=>contact.id!=action.payload.id)
        }
 
        

      case editCon:
        {
          const {id,...otherProperties}=action.payload
          let index=state.contacts.findIndex((contact)=>contact.id==id)
        //   let prevContact=contacts[index]
          let newContactsList=[...state.contacts]
          newContactsList.splice(index,1,{...action.payload})
          return {
            ...state,
            contacts: newContactsList
          }
          
        }
        default:
          return state
    }
  }


export default contactReducer