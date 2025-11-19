import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Charts from "./components/Charts";

function App() {
  const [data, setData] = useState([]);
  const [yearMin, setYearMin] = useState("1968"); 
  const [yearMax, setYearMax] = useState("1969");
  const [view, setView] = useState("table");

  //elegir paises
  const [countries, setCountries] = React.useState([]);
  const [countrySearch, setCountrySearch] = React.useState("");
  const [selectedCountries, setSelectedCountries] = React.useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/countries")
    .then(res => res.json())
    .then(data => {
      const list = data.map(item => item.entity ?? item); 
      setCountries(list);
    })
    .catch(err => console.error("Error cargando países:", err));
}, []); // solo al montar

useEffect(() => {
  let url = "http://localhost:5000/api/emissions/filter?";

  // Filtro año
  if (yearMin) url += `yearMin=${yearMin}&`;
  if (yearMax) url += `yearMax=${yearMax}&`;

  // Filtro países
  if (selectedCountries.length > 0) {
    url += `countries=${selectedCountries.join(",")}`;
  }

  // Si no hay filtros → obtener todo
  if (!yearMin && !yearMax && selectedCountries.length === 0) {
    url = "http://localhost:5000/api/emissions";
  }

  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));

}, [yearMin, yearMax, selectedCountries]);


function toggleCountry(country) {
  setSelectedCountries(prev =>
    prev.includes(country)
      ? prev.filter(c => c !== country)
      : [...prev, country]
  );
}

  return (
<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  <Header />
  <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
    <Sidebar
  yearMin={yearMin}
  setYearMin={setYearMin}
  yearMax={yearMax}
  setYearMax={setYearMax}
  setView={setView}

  //paises
  countries={countries}
  selectedCountries={selectedCountries}
  toggleCountry={toggleCountry}
  countrySearch={countrySearch}
  setCountrySearch={setCountrySearch}

/>

    
    {view === "table" && <Main data={data} />}
    {view === "charts" && <Charts data={data} />}
  </div>
</div>


  );
}
export default App;
