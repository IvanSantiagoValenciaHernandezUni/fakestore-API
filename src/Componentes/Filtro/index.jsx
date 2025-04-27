function Filtro({ onTipoChange }) {
  const tipos = [
    "All",
    "Clothes", "Electronics", "Furniture", "Shoes", "Miscellaneous", "un nuevo nombre", 
    "Nueva Categoria","category_B", "New category"
  ];

  return (
    <div className="c-filtro">
      {tipos.map((unTipo, index) => (
        <button
          className=""
          key={index}
          onClick={() => onTipoChange(unTipo)}
        >
          {unTipo}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
