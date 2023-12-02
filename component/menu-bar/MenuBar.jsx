"use client"

import { signOut } from 'next-auth/react'
import './style.css'

function MenuBar() {
    console.log("its working")
  return (
    <div className='menu-bar-container'>
        <button className='primary-button' onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default MenuBar