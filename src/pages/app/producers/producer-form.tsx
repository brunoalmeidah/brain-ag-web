import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "@/components/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createOrUpdateProducer, getProducer } from "@/api/producer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCrops } from "@/api/crop";
import { toast } from "sonner";
import { NumberInput } from "@/components/number-input";
import { DocumentInput } from "@/components/document-input";
import { queryClient } from "@/lib/react-query";
import { validateCPF } from "@/helpers/validateCPF";
import { validateCNPJ } from "@/helpers/validateCNPJ";

const schema = z.object({
  producerName: z.string().min(1, "Campo obrigatório"),
  document: z.string().min(1, "Campo obrigatório"),
  farmName: z.string().min(1, "Campo obrigatório"),
  city: z.string().min(1, "Campo obrigatório"),
  state: z.string().min(1, "Campo obrigatório"),
  farmTotalArea: z
    .number({
      required_error: "Campo obrigatório",
    })
    .positive("Área total deve ser maior que zero"),
  farmUsableTotalArea: z
    .number({
      required_error: "Campo obrigatório",
    })
    .positive("Área agricultável deve ser maior que zero"),

  farmVegetationTotalArea: z
    .number({
      required_error: "Campo obrigatório",
    })
    .positive("Área de vegetação deve ser maior que zero"),
  crops: z
    .object({
      id: z.number(),
      description: z.string(),
    }, {required_error: "É obrigatório adicionar pelo menos uma cultura" })
    .array()
    .min(1, "É obrigatório adicionar pelo menos uma cultura"),
});

export type ProducerFormType = z.infer<typeof schema>;

export function ProducerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<{
    id: number;
    description: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    getValues,
    setError,
    clearErrors
  } = useForm<ProducerFormType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createOrUpdate } = useMutation({
    mutationFn: createOrUpdateProducer,
  });

  const query = useQuery({
    queryFn: () => getProducer(id ?? ""),
    queryKey: ["producer", id],
    enabled: !!id,
  });

  const queryCrops = useQuery({
    queryFn: getCrops,
    queryKey: ["crops"],
  });

  useEffect(() => {
    if (query.data) {
      console.log(query.data)
      setValue("producerName", query.data.producerName);
      setValue("document", query.data.document);
      setValue("farmName", query.data.farmName);
      setValue("city", query.data.city);
      setValue("state", query.data.state);
      setValue("farmTotalArea", query.data.farmTotalArea);
      setValue("farmUsableTotalArea", query.data.farmUsableTotalArea);
      setValue("farmVegetationTotalArea", query.data.farmVegetationTotalArea);
      setValue("crops", query.data.crops);
    }
  }, [query.data, setValue]);

  const crops = watch("crops");

  function handleCancel() {
    navigate("/produtores");
  }

  async function onSubmit(formData: ProducerFormType) {
    try {
      await createOrUpdate({ ...formData, id });
      toast.success(
        id ? "Produtor atualizado com sucesso!" : "Produtor criado com sucesso!"
      );
      await queryClient.invalidateQueries({ queryKey: ["producer"] });
      navigate("/produtores");
    } catch {
      toast.error(
        "Aconteceu algum erro ao cadastrar ou atualizar o produtor, tente novamente"
      );
    }
  }

  function addCrop() {
    const _crops = getValues("crops");
    const findIndex = _crops?.findIndex((item) => item.id === selectedCrop?.id);

    if ((findIndex ?? -1) !== -1) {
      toast.error("Essa cultura já foi adicionada!");
      setSelectedCrop(null);
      return;
    }
    setValue("crops", [
      ...(_crops ?? []),
      {
        id: selectedCrop?.id ?? 0,
        description: selectedCrop?.description ?? "",
      },
    ]);
    setSelectedCrop(null);
  }

  function handleValueChange(value: string) {
    setSelectedCrop(
      queryCrops.data?.find((item) => String(item.id) === value) || null
    );
  }

  function handleDeleteCrop(index: number) {
    const _crops = getValues("crops");
    const newCrops = [..._crops];
    newCrops.splice(index, 1);
    setValue("crops", newCrops);
  }

  function validateTotalArea() {
    const farmTotalArea = Number(getValues('farmTotalArea') || 0)
    const farmUsableTotalArea = Number(getValues('farmUsableTotalArea') || 0)
    const farmVegetationTotalArea = Number(getValues('farmVegetationTotalArea') || 0)

    const totalArea = farmUsableTotalArea + farmVegetationTotalArea;
    if(totalArea >  farmTotalArea){
      setError('farmTotalArea', { message : 'Soma da área agricultável e vegetação não pode ser maior que a área total' })
    } else {
      clearErrors('farmTotalArea')
    }
  }

  function validateDocument() {
    const doc = getValues('document');
    const isValid = doc.length > 11 ? validateCNPJ(doc) : validateCPF(doc);
    if(!isValid) {
      setError('document', { message : 'Documento inválido' })
    } else {
      clearErrors('document')
    }
  }
  return (
    <>
      <Helmet title="Produtores" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{id ? 'Editar' : 'Novo'} Produtor</h1>

        <div className="rouded-md border-t-2 pt-8 w-full 2xl:w-[50%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full gap-4 flex-col">
              <div className="flex w-full gap-4">
                <div className="flex h-full w-[70%] flex-col gap-3">
                  <Label htmlFor="producerName">Nome</Label>
                  <Input
                    className="w-full"
                    id="producerName"
                    placeholder="Escreva aqui o nome do produtor"
                    {...register("producerName")}
                  />
                  <Error message={errors.producerName?.message} />
                </div>
                <div className="flex h-full w-[30%] flex-col gap-3">
                  <Label htmlFor="document">Documento</Label>
                  <DocumentInput
                    className="w-full"
                    id="document"
                    placeholder="Escreva aqui o CPF ou CNPJ"
                    control={control}
                    name="document"
                    initialValue={getValues("document") ?? ""}
                    onBlur={validateDocument}
                  />
                  <Error message={errors.document?.message} />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex h-full w-[70%] flex-col gap-3">
                  <Label htmlFor="farmName">Fazenda</Label>
                  <Input
                    className="w-full"
                    id="farmName"
                    placeholder="Escreva aqui o nome da fazenda"
                    {...register("farmName")}
                  />
                  <Error message={errors.farmName?.message} />
                </div>
                <div className="flex h-full w-[20%] flex-col gap-3">
                  <Label htmlFor="city">Cidade</Label>
                  <Input className="w-full" id="city" {...register("city")} />
                  <Error message={errors.city?.message} />
                </div>
                <div className="flex h-full w-[10%] flex-col gap-3">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    className="w-full"
                    id="state"
                    {...register("state")}
                    maxLength={2}
                  />
                  <Error message={errors.state?.message} />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex h-full flex-1 flex-col gap-3">
                  <Label htmlFor="farmTotalArea">Área total</Label>
                  <NumberInput
                    control={control}
                    initialValue={getValues("farmTotalArea") ?? ""}
                    id="farmTotalArea"
                    name="farmTotalArea"
                    className="w-full"
                    onBlur={validateTotalArea}
                  />

                  <Error message={errors.farmTotalArea?.message} />
                </div>
                <div className="flex h-full flex-1 flex-col gap-3">
                  <Label htmlFor="farmUsableTotalArea">Área agricultável</Label>
                  <NumberInput
                    control={control}
                    initialValue={getValues("farmUsableTotalArea") ?? ""}
                    id="farmUsableTotalArea"
                    name="farmUsableTotalArea"
                    className="w-full"
                    onBlur={validateTotalArea}
                  />

                  <Error message={errors.farmUsableTotalArea?.message} />
                </div>
                <div className="flex h-full flex-1 flex-col gap-3">
                  <Label htmlFor="farmVegetationTotalArea">
                    Área de vegetação
                  </Label>
                  <NumberInput
                    control={control}
                    initialValue={getValues("farmVegetationTotalArea") ?? ""}
                    id="farmVegetationTotalArea"
                    name="farmVegetationTotalArea"
                    className="w-full"
                    onBlur={validateTotalArea}
                  />
                  <Error message={errors.farmVegetationTotalArea?.message} />
                </div>
              </div>
              <div>
                <div className="flex w-full gap-4 items-center justify-center">
                  <div className="flex h-full flex-1 flex-col gap-3">
                    <Label htmlFor="crops">Culturas</Label>
                    <Select
                      onValueChange={handleValueChange}
                      value={`${selectedCrop?.id}`}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          id="crops"
                          placeholder="Selecione a cultura"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {queryCrops.data?.map((item) => (
                            <SelectItem
                              value={`${item.id}`}
                              key={`select-${item.id}`}
                            >
                              {item.description}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="mt-[25px]"
                    onClick={addCrop}
                    disabled={!selectedCrop}
                    type="button"
                  >
                    Adicionar
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!crops || crops?.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="flex items-center justify-center"
                        >
                          Selecione uma Cultura acima e clique em adicionar.
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {crops?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="default"
                            className="text-red-600 "
                            onClick={() => handleDeleteCrop(index)}
                          >
                            <Trash className=" h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Error message={errors.crops?.message} />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button size="lg" type="submit">
                Salvar
              </Button>
              <Button variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
