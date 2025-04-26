function Filtro({ onTipoChange }) {
  const tipos = [
    "All",
    "change", "nuevo", "Furniture", "Shoes", "Miscellaneous", "un nuevo nombre", "Nueva Categoria",
    "Royal Items","category_B", "string", "New category"
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
