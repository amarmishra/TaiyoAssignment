
export interface Contact{
    firstName:string,
    lastName:string,
    active:boolean,
    id?:string
}


//action types
export const addCon='addContact'
export const delCon='deleteContact'
export const editCon='editContact'


//action creators
export function addContact(contact:IContact){
    return {type:addCon,payload:{...contact,id:`${contact.firstName}-${Date.now()}`}}
}
export function deleteContact(contact:IContact){
    return {type:delCon,payload:contact}
}
export function editContact(contact:IContact){
    return {type:editCon,payload:contact}
}