import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { ProducerTableRow } from "./producer-table-row";
import { IFilterData, ProducerTableFilters } from "./producer-table-filters";
import { useQuery } from "@tanstack/react-query";
import { getProducers } from "@/api/producer";
import { useState } from "react";

export function Producers() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<IFilterData | null>();

  const query = useQuery({
    queryFn: () => getProducers({ name: filter?.name ?? "", page }),
    queryKey: ["producers", filter, page],
  });

  function handleFilter(data: IFilterData | null) {
    setFilter(data);
  }

  function handlePageChange(_page: number) {
    setPage(_page);
  }

  return (
    <>
      <Helmet title="Produtores" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Produtores</h1>
        </div>

        <div className="space-y-2.5">
          <ProducerTableFilters onFilter={handleFilter} />
          <div className="rouded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Nome</TableHead>
                  <TableHead>Fazenda</TableHead>
                  <TableHead className="w-[140px]">Documento</TableHead>
                  <TableHead className="w-[140px]">Cidade</TableHead>
                  <TableHead className="w-[140px]">Estado</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {query.data?.rows?.length === 0 ? (
                  <TableRow>
                    <TableCell className="text-center font-medium" colSpan={6}>
                      Nenhum produtor encontrado
                    </TableCell>
                  </TableRow>
                ) : null}
                {query.data?.rows.map((item) => (
                  <ProducerTableRow data={item} />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            page={page}
            totalCount={query.data?.count || 0}
            perPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
