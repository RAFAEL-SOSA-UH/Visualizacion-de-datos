import React from "react";

function Sidebar({ 
//filtro de año
  yearMin,
  setYearMin, 
  yearMax, 
  setYearMax,
//filtro por país
  countries,
  selectedCountries,
  toggleCountry,
  countrySearch,
  setCountrySearch,
  setView,
}) {
  return (
    <aside style={{
      width: "200px",
      background: "#f0f0f0",
      padding: "20px",
      height: "100vh",
      boxSizing: "border-box",
      overflowY: "auto",
      position: "sticky",
      top: 0,
      color: "black"
    }}>

      {/* BUSCADOR */}
<input
  type="text"
  placeholder="Buscar país..."
  value={countrySearch}
  onChange={(e) => setCountrySearch(e.target.value)}
  style={{
    width: "100%",
    padding: "5px",
    marginBottom: "10px",
    boxSizing: "border-box",
  }}
/>

{/* LISTA DE PAISES */}
<div style={{ maxHeight: "200px", overflowY: "auto" }}>
  {countries
    .filter(c =>
      c.toLowerCase().includes(countrySearch.toLowerCase())
    )
    .map(country => (
      <div
        key={country}
        onClick={() => toggleCountry(country)}
        style={{
          cursor: "pointer",
          padding: "5px",
          marginBottom: "5px",
          borderRadius: "5px",
          background: selectedCountries.includes(country)
            ? "#007bff"
            : "#e0e0e0",
          color: selectedCountries.includes(country)
            ? "white"
            : "black",
        }}
      >
        {country}
      </div>
  ))}
</div>


      <h3>Filtros</h3>

      {/* Año mínimo */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="yearMin">Año mínimo:</label>
        <input
          id="yearMin"
          type="number"
          value={yearMin}
          onChange={(e) =>
            // permitir campo vacío para poder limpiar el filtro
            setYearMin(e.target.value === "" ? "" : Number(e.target.value))
          }
          style={{
            width: "100%",
            marginTop: "5px",
            padding: "5px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Año máximo */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="yearMax">Año máximo:</label>
        <input
          id="yearMax"
          type="number"
          value={yearMax}
          onChange={(e) =>
            setYearMax(e.target.value === "" ? "" : Number(e.target.value))
          }
          style={{
            width: "100%",
            marginTop: "5px",
            padding: "5px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Navegación */}
      <button
        style={{ width: "100%", margin: "5px 0" }}
        onClick={() => setView("table")}
      >
        Tabla
      </button>

      <button
        style={{ width: "100%", margin: "5px 0" }}
        onClick={() => setView("charts")}
      >
        Gráficos y KPIs
      </button>

    </aside>
  );
}

export default Sidebar;
