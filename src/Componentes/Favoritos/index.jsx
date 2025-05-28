import { useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="titulo-favoritos">Mis productos favoritos</h1>

      {favoritos.length === 0 ? (
        <p>No hay productos favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((producto, index) => (
            <div 
              className='c-lista-producto'
              onClick={() => navigate(`/productos/${producto.id}`)}
              key={index}
            >
              <img 
                src={producto.images?.[0] || 'https://via.placeholder.com/150'}
                alt={producto.title}
                width='auto' 
                height='60' 
                loading='lazy'
                onError={e => e.target.src = 'https://via.placeholder.com/150'}
              />
              <p>{producto.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
