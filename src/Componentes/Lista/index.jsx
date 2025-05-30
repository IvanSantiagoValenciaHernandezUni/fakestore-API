import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Contexto/contexto';
import './style.css';
import Filtro from '../Filtro';

function Lista() {
  const navigate = useNavigate();
  const { setBuscadosRecientemente } = useContext(AppContext);

  const [productos, setProductos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        if (tipoSeleccionado === 'All') {
          const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
          const data = await res.json();
          setProductos(data);
        } else {
          const resCategorias = await fetch(`https://api.escuelajs.co/api/v1/categories`);
          const categorias = await resCategorias.json();
          const categoriaElegida = categorias.find(cat => cat.name.toLowerCase() === tipoSeleccionado.toLowerCase());

          if (categoriaElegida) {
            const resFiltrado = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoriaElegida.id}/products`);
            const dataFiltrada = await resFiltrado.json();
            setProductos(dataFiltrada);
          } else {
            setProductos([]);
          }
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = productos;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = productos.filter(producto =>
      producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = productos.filter(producto =>
      producto.id.toString().includes(busqueda)
    );
  }

  return (
  <>
    <input
      type="text"
      placeholder="Buscar productos"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="c-buscador"
    />
    <Filtro onTipoChange={handleTipoChange} />
    
    <section className="c-lista">
      {resultados.length > 0 ? (
        resultados.map((producto) => (
          <div
            className="c-lista-pokemon"
            onClick={() => navigate(`/productos/${producto.id}`)}
            key={producto.id}
          >
            <img
              src={producto.images?.[0]}
              alt={producto.title}
              width="auto"
              height="60"
              loading="lazy"
            />
            <p>{producto.title}</p>
          </div>
        ))
      ) : (
        tipoSeleccionado.toLowerCase() === "furniture" && (
          <p style={{ textAlign: 'center', padding: '20px' }}>
            No hay productos disponibles.
          </p>
        )
      )}
    </section>
  </>
);
}

export default Lista;
