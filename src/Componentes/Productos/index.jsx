import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom"; 
import { AppContext } from '../../Contexto/contexto';
import './style.css';

function Productos() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  const {
    favoritos, setFavoritos,
    buscadosRecientemente, setBuscadosRecientemente,
    listaCapturados, setListaCapturados
  } = useContext(AppContext);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => {
        setProducto(data);

        if (!buscadosRecientemente.includes(data.id)) {
          setBuscadosRecientemente(prev => [...prev, data.id]);
        }

        if (!listaCapturados.includes(data.id.toString())) {
          setListaCapturados(prev => [...prev, data.id.toString()]);
        }
      })
      .catch(err => {
        console.error("Error al cargar producto:", err);
        setProducto(null);
      });
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  const esFavorito = favoritos.some(item => item.id === producto.id);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(item => item.id !== producto.id));
    } else {
      setFavoritos([...favoritos, producto]);
    }
  };

  return (
    <div className="c-producto" style={{ paddingBottom: '100px' }}>
      <img 
        src={producto.images?.[0] || ''} 
        alt={producto.title} 
        width="200"
        onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
      />
      <h2>{producto.title}</h2>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <p><strong>Descripción:</strong> {producto.description}</p>
      <p><strong>Categoría:</strong> {producto.category?.name || 'Sin categoría'}</p>
      <p><strong>ID:</strong> {producto.id}</p>

      <button onClick={toggleFavorito} style={{ cursor: 'pointer', marginTop: '15px' }}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
      </button>
    </div>
  );
}

export default Productos;
