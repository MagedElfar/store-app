import React from 'react';
import Nav from './../nav/Nav/Nav';
import TobBar from './../topbar/topbar/Top-bar';


function Header (){
    return(
        <header id="main-header">
            <TobBar />
            <Nav />
        </header>
    )
}

export default Header;