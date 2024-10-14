import { Helmet } from "react-helmet-async";
import { TotalCard } from "./total-card";
import { PizzaChart } from "@/components/pizza-chart";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/api/dashboard";

export function Dashboard() {

  const query = useQuery({
    queryFn: () => getDashboard(),
    queryKey: ["dashboard"],
  });

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight"> Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <TotalCard title="Total de Fazendas" value={`${query.data?.totalFarms ?? 0}`} />
          <TotalCard title="Área Total" value={`${query.data?.totalArea ?? 0} ha`} />
        </div>

        <div className="grid grid-cols-9  gap-4">
          <PizzaChart
            data={query.data?.pizzaChartByState ?? []}
            title="Estado"
          />
          <PizzaChart
            data={query.data?.pizzaChartByCrop ?? []}
            title="Cultura"
          />
          <PizzaChart
            data={query.data?.pizzaChartBySoil ?? []}
            title="Solo"
          />
        </div>
      </div>
    </>
  );
}
