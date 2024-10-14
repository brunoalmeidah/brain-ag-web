import { deleteProducer } from "@/api/producer";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { applyDocumentMask } from "@/helpers/applyDocumentMask";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IProps {
  data: {
    id: string
    producerName: string;
    document: string;
    farmName: string;
    city: string;
    state: string;
  };
}
export function ProducerTableRow({ data }: IProps) {
  const navigate = useNavigate()
  const { mutateAsync: remove } = useMutation({
    mutationFn: deleteProducer,
  })
  function handleEdit() {
    navigate(`/produtores/${data.id}`)
  }
  async function handleDelete() {
    try {
      await remove(data.id)
      toast.success('Produtor deletado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['producers'] })
    } catch {
      toast.error('Aconteceu algum erro ao deletar o produtor, tente novamente')
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{data.producerName}</TableCell>
      <TableCell className="font-medium">{data.farmName}</TableCell>
      <TableCell className="font-medium">{applyDocumentMask(data.document)}</TableCell>

      <TableCell className="font-medium">{data.city}</TableCell>
      <TableCell className="font-medium">{data.state}</TableCell>
      <TableCell className="flex">
        <Button variant="ghost" size="default" onClick={handleEdit}>
          <Pen className="mr-2 h-3 w-3" />
          Editar
        </Button>
        <Button variant="ghost" size="default" className="text-red-600" onClick={handleDelete}>
          <Trash className="mr-2 h-3 w-3" />
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  );
}
