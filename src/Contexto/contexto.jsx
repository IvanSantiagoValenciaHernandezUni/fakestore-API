import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
  const capturadosGuardados = JSON.parse(localStorage.getItem("listaCapturados")) || [];
  const buscadosGuardados = JSON.parse(localStorage.getItem("buscadosRecientemente")) || [];

  const [favoritos, setFavoritos] = useState(favoritosGuardados);
  const [carrito, setCarrito] = useState(carritoGuardado);
  const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);
  const [buscadosRecientemente, setBuscadosRecientemente] = useState(buscadosGuardados);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('All');

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("listaCapturados", JSON.stringify(listaCapturados));
  }, [listaCapturados]);

  useEffect(() => {
    localStorage.setItem("buscadosRecientemente", JSON.stringify(buscadosRecientemente));
  }, [buscadosRecientemente]);

  return (
    <AppContext.Provider value={{
      favoritos, setFavoritos,
      carrito, setCarrito,
      listaCapturados, setListaCapturados,
      buscadosRecientemente, setBuscadosRecientemente,
      productos, setProductos,
      categoriaSeleccionada, setCategoriaSeleccionada,
    }}>
      {children}
    </AppContext.Provider>
  );
}
