import { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'


function Menu() {

    return (
        <nav className="c-menu">
          <Link to="/">Aleatorios</Link>
          <Link to="/capturados">Capturados</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/lista">Lista</Link>
          <Link to="/usuarios">Usuarios</Link>
          
        </nav>
    )
}

export default Menu