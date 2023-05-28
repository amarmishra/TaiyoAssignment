import React from 'react'
import * as FaIcon from 'react-icons/fa'
import * as AiIcon from 'react-icons/ai'
import * as TbIcon from 'react-icons/tb'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import '../assets/css/sidebar_style.css'

export const Sidebar = () => {
    //state hook to toggle
    const [sidebar,setSidebar]=useState<boolean>(false)
    
    return (
    <>
    <div className='navbar'>
        <Link to="#" className='menu-bars'> 
            <FaIcon.FaBars onClick={handleToggle}></FaIcon.FaBars>
        </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
        <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
                <Link to="#" className='menu-bars' onClick={handleToggle}>
                   <AiIcon.AiOutlineClose></AiIcon.AiOutlineClose>
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/" onClick={handleToggle}>
                   <AiIcon.AiOutlineContacts></AiIcon.AiOutlineContacts > Home
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/chart" onClick={handleToggle}>
                    <AiIcon.AiOutlineLineChart></AiIcon.AiOutlineLineChart>Chart
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/mapping" onClick={handleToggle}>
                <TbIcon.TbMapSearch></TbIcon.TbMapSearch> Map
                </Link>
            </li>
        </ul>
    </nav>
    </> 
    )


    function handleToggle(){
        setSidebar(!sidebar)
    }
  
}
