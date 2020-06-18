import React , {Component} from "react";
import {NavLink} from "react-router-dom"

const Menu = () => {
    const activeStyle = {color: '#040404'};
    return (
    <nav>
        <NavLink to="" activeStyle={activeStyle} exact> Home </NavLink>
        {" | "}
        <NavLink to="/snakes" activeStyle={activeStyle}>Snakes</NavLink>
        {" | "}
        <NavLink to="/about" activeStyle={activeStyle}>About</NavLink> 
    </nav>
    )
}

export default Menu