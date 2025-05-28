import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Contexto/contexto';
import "./style.css";

function Capturados() {
  const { listaCapturados, buscadosRecientemente } = useContext(AppContext);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function obtenerProductos() {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
        const data = await res.json();
        const filtrados = data.filter(producto => buscadosRecientemente.includes(producto.id));
        setProductos(filtrados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }

    if (buscadosRecientemente.length > 0) {
      obtenerProductos();
    } else {
      setProductos([]);
    }
  }, [buscadosRecientemente]);

  return (
    <>
      <h1 className="titulo-capturados">Los Productos más Buscados</h1>

      <p>{listaCapturados.length} / {buscadosRecientemente.length} productos más buscados o guardados:</p>

      <section className="c-aleatorio c-lista">
        {buscadosRecientemente.length === 0 && <p>No hay productos buscados recientemente.</p>}
        {buscadosRecientemente.map((id) => {
          const producto = productos.find(p => p.id === id);
          const capturado = listaCapturados.includes(id.toString());

          return (
            <div
              key={id}
              className={capturado ? "c-unpoke c-mios-pokemon c-lista-producto" : "c-unpoke c-lista-producto"}
              onClick={() => capturado ? navigate(`/productos/${id}`) : null}
              style={{ cursor: capturado ? 'pointer' : 'default' }}
            >
              {capturado && producto ? (
                <>
                  <img
                    src={producto.images?.[0] || producto.image || 'https://via.placeholder.com/100'}
                    alt={producto.title}
                    width="auto"
                    height="45"
                    loading="lazy"
                  />
                  <p>{producto.title}</p>
                </>
              ) : (
                <p>ID: {id}</p>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Capturados;
