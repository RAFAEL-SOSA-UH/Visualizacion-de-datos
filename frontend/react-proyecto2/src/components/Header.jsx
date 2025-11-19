import React from "react";

function Header() {
  return (
    <header style={{
      width: "100%",               // el header ocupa todo el ancho de la ventana
      background: "#282c34",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        width: "1920px",           // ancho fijo del contenido
        maxWidth: "100%",          // nunca se pase del tamaño de la ventana
        textAlign: "center",       // texto centrado dentro del div
      }}>
        <h1 style={{ margin: 0 }}>Dashboard CO₂</h1>
      </div>
    </header>
  );
}

export default Header;
