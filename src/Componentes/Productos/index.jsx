import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css';

function Productos() {
  const { name } = useParams();
  const [datapoke, setDatapoke] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]); 

  if (!datapoke) return <p>Cargando...</p>;

  return (
    <div className="c-producto">
      <img 
        src={datapoke.images[0]} 
        alt={datapoke.title} 
        width="200"
      />
      <h2>{datapoke.title}</h2>
      <p><strong>Precio:</strong> ${datapoke.price}</p>
      <p><strong>Descripción:</strong> {datapoke.description}</p>
      <p><strong>Categoría:</strong> {datapoke.category.name}</p>
      <p><strong>ID:</strong> {datapoke.id}</p>
    </div>
  );
}

export default Productos;
