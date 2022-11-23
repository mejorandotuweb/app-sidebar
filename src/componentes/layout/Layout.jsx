import React from 'react';
import NavBar from '../Navbar';
const Layout =({children}) =>{
    return(
        <>
        <div>
           <NavBar></NavBar>
        </div>
        <main>{children}</main>
        </>
    )
}

export default Layout;