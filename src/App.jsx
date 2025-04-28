import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Aleatorios from './Componentes/Aleatorios'
import Capturados from './Componentes/Capturados'
import Favoritos from './Componentes/Favoritos'
import Lista from './Componentes/Lista'
import Productos from './Componentes/Productos'
import Usuarios from './Componentes/Usuarios'
import Elementos from './Componentes/Elementos'
import Menu from './Componentes/Menu'

function App() {

  return (
    <Router>

      <Menu />
      
      <Routes>
        <Route path="/" element={<Aleatorios />} />
        <Route path="/Capturados" element={<Capturados />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Lista" element={<Lista />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Elementos" element={<Elementos />} />
        <Route path="/Productos/:name" element={<Productos />} />
      </Routes>
    </Router>
  )
}

export default App
