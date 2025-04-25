import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../Filtro';

function Lista() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        let res;
        if (tipoSeleccionado === 'All') {
          res = await fetch(`https://api.escuelajs.co/api/v1/products?limit=50`);
        } else {
          res = await fetch(`https://api.escuelajs.co/api/v1/categories/${tipoSeleccionado}/products`);
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setData([]);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;
  if (busqueda.length >= 1) {
    resultados = data.filter(producto => {
      const titulo = producto.title.toLowerCase();
      const categoria = producto.category?.name.toLowerCase();
      const id = producto.id.toString();
      const termino = busqueda.toLowerCase();

      return (
        titulo.includes(termino) ||
        categoria.includes(termino) ||
        id.includes(termino)
      );
    });
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleTipoChange} />

      <section className='c-lista'>
        {resultados.map((producto, index) => (
          <div
            className='c-lista-pokemon'
            onClick={() => navigate(`/Productos/${producto.id}`)}
            key={index}
          >
            <img
              src={producto.images[0]}
              alt={producto.title}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p>{producto.title}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
