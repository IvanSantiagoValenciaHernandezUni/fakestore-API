import { useEffect, useState } from 'react';

function Filtro({ onTipoChange }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories');
        const json = await res.json();
        setCategorias(json);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="c-filtro">
      <button className='' onClick={() => onTipoChange('All')}>
        Todos
      </button>
      {categorias.map((cat) => (
        <button className='' key={cat.id} onClick={() => onTipoChange(cat.id)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
