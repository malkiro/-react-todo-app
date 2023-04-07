import React from 'react';
import './Header.css';


function Header() {
  return (
    <div className='header'>
        <div className='headerRight'>
        <h2>Hello, <span>User</span></h2>
        <button>LOGOUT</button>
        </div>
    </div>
  )
}

export default Header