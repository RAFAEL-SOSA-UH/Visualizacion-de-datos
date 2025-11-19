import React, { useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

/**
 * Charts.jsx
 * - LineChart: CO2 total por año
 * - BarChart: Top N países por CO2
 * - KPIs: total, promedio, máximo
 * 
 * Props:
 * - data: array de filas { entity, code, year, annual_co2_emissions }
 * - yRange (opcional): { min: number, max: number } para forzar eje Y
 */
export default function Charts({ data, yRange }) {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  // --- 1) CO2 total por año
  const aggregatedByYear = useMemo(() => {
    const map = new Map();
    for (const row of data) {
      const year = Number(row.year);
      const val = Number(row.annual_co2_emissions) || 0;
      map.set(year, (map.get(year) || 0) + val);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([year, total]) => ({ year, total }));
  }, [data]);

  const years = aggregatedByYear.map(r => r.year);
  const co2PerYear = aggregatedByYear.map(r => r.total);

  // --- 2) Top países por CO2
  const { countryNames, totalsByCountry } = useMemo(() => {
    const map = new Map();
    for (const row of data) {
      const country = row.entity;
      const val = Number(row.annual_co2_emissions) || 0;
      map.set(country, (map.get(country) || 0) + val);
    }
    const arr = Array.from(map.entries()).map(([entity, total]) => ({ entity, total }));
    arr.sort((a, b) => b.total - a.total);
    const topN = 12;
    const top = arr.slice(0, topN);
    return {
      countryNames: top.map(x => x.entity),
      totalsByCountry: top.map(x => x.total),
    };
  }, [data]);

  // --- 3) KPIs
  const { totalAll, avg, max } = useMemo(() => {
    let total = 0, count = 0, maxVal = -Infinity;
    for (const row of data) {
      const v = Number(row.annual_co2_emissions) || 0;
      total += v;
      count++;
      if (v > maxVal) maxVal = v;
    }
    return { totalAll: total, avg: count ? total / count : 0, max: maxVal === -Infinity ? 0 : maxVal };
  }, [data]);

  const fmt = n => n.toLocaleString();

  // --- 4) Ejes Y automáticos
  const yMin = yRange?.min ?? 0;
  const yMaxData = Math.max(...co2PerYear);
  const yMax = yRange?.max ?? yMaxData * 1.1; // 10% extra
  

  return (
    <div style={{ padding: 20, width: "100%", boxSizing: "border-box" }}>
      {/* KPIs */}
      <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ padding: 12, borderRadius: 8, background: "#f5f5f5", minWidth: 160, color: "#000" }}>
          <div style={{ fontSize: 12 }}>Total (filtrado)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{fmt(totalAll)}</div>
        </div>
        <div style={{ padding: 12, borderRadius: 8, background: "#f5f5f5", minWidth: 160, color: "#000" }}>
          <div style={{ fontSize: 12 }}>Promedio por fila</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{fmt(Math.round(avg))}</div>
        </div>
        <div style={{ padding: 12, borderRadius: 8, background: "#f5f5f5", minWidth: 160, color: "#000" }}>
          <div style={{ fontSize: 12 }}>Máximo (fila)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{fmt(max)}</div>
        </div>
      </div>

      {/* LineChart */}
      <h3>CO₂ total por año</h3>
      <div style={{ width: "100%", height: 360 }}>
        <LineChart
          height={320}
          series={[{ data: co2PerYear, label: "CO₂ (total por año)", color: "red" }]}
          xAxis={[{ data: years, label: "Año", labelStyle: { fill: "white" }, tickLabelStyle: { fill: "white" }, stroke: "white" }]}
          yAxis={[{ label: "Emisiones", labelStyle: { fill: "white" }, tickLabelStyle: { fill: "white" }, stroke: "white", min: yMin, max: yMax }]}
          sx={{
            backgroundColor: "#222",
            "& .MuiChartsLegend-root": { color: "white" },
            "& .MuiChartsTooltip-root": { color: "black" },
          }}
        />
      </div>

      {/* BarChart */}
      <h3 style={{ marginTop: 36 }}>Top países por CO₂ (total en filtro)</h3>
      <div style={{ width: "100%", height: 420 }}>
        <BarChart
          height={380}
          series={[{ data: totalsByCountry, label: "Total CO₂", color: "#4f8cfcff" }]}
          xAxis={[{ data: countryNames, label: "País", scaleType: "band", labelStyle: { fill: "white" }, tickLabelStyle: { fill: "white" }, stroke: "white" }]}
          yAxis={[{ label: "Emisiones", labelStyle: { fill: "white" }, tickLabelStyle: { fill: "white" }, stroke: "white", min: yMin, max: yMax }]}
          sx={{
            backgroundColor: "#222",
            "& .MuiChartsLegend-root": { color: "white" },
            "& .MuiChartsTooltip-root": { color: "black" },
          }}
        />
      </div>
    </div>
  );
}
