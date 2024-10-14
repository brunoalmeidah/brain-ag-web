const data = {
  totalFarms: 200,
  totalArea: 2000,
  pizzaChartBySoil: [
    { label: "Área agricultável", value: 70 },
    { label: "Vegetação", value: 30 },
  ],
  pizzaChartByCrop: [
    { label: "Milho", value: 10 },
    { label: "Café", value: 40 },
    { label: "Soja", value: 50 },
    { label: "Feijão", value: 20 },
  ],
  pizzaChartByState: [
    { label: "SP", value: 10 },
    { label: "RJ", value: 40 },
    { label: "MG", value: 50 },
    { label: "ES", value: 20 },
  ],
};
export async function getDashboard() {
  return Promise.resolve(data);
}
