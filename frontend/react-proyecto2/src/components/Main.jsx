import React from "react";

function Main({ data }) {
  if (!data || data.length === 0) {
    return <main style={{ padding: "20px" }}>No hay datos disponibles</main>;
  }
  
  const columns = Object.keys(data[0]);

  return (
    <main style={{ flex: 1, padding: "20px", overflow: "auto" }}>
      <h2>Tabla de emisiones de CO₂</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#413939ff",
                  textAlign: "left",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col} style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Main;
