import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/emissions")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Datos de Emisiones de CO₂</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Entity</th>
            <th>Code</th>
            <th>Year</th>
            <th>Emisiones (CO₂)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.entity}</td>
              <td>{row.code}</td>
              <td>{row.year}</td>
              <td>{row.annual_co2_emissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
