import { ProducerFormType } from "@/pages/app/producers/producer-form";

export interface Producer {
  id: string;
  document: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  farmTotalArea: number;
  farmUsableTotalArea: number;
  farmVegetationTotalArea: number;
  crops: { id: number; description: string }[];
}

interface GetProducersProps {
  name: string | null;
  page: number;
}

const producers: Producer[] = [
  {
    id: "1",
    producerName: "Produtor teste 1",
    document: "02023890063",
    city: "São Paulo",
    state: "SP",
    farmName: "Fazenda teste 1",
    farmTotalArea: 3000,
    farmUsableTotalArea: 2000,
    farmVegetationTotalArea: 1000,
    crops: [
      { id: 1, description: "Milho" },
      { id: 2, description: "Soja" },
    ],
  },
  {
    id: "2",
    producerName: "Produtor teste 2",
    document: "31481514024",
    city: "São Paulo",
    state: "SP",
    farmName: "Fazenda teste 2",
    farmTotalArea: 3000,
    farmUsableTotalArea: 2000,
    farmVegetationTotalArea: 1000,
    crops: [
      { id: 1, description: "Milho" },
      { id: 2, description: "Soja" },
    ],
  },
  {
    id: "3",
    producerName: "Produtor teste 3",
    document: "31481514024",
    city: "São Paulo",
    state: "SP",
    farmName: "Fazenda teste 3",
    farmTotalArea: 3000,
    farmUsableTotalArea: 2000,
    farmVegetationTotalArea: 1000,
    crops: [
      { id: 1, description: "Milho" },
      { id: 2, description: "Soja" },
    ],
  },
];

export async function createOrUpdateProducer(
  data: ProducerFormType & { id: string | undefined }
) {
  const index = producers.findIndex((item) => item.id === data.id);
  if (index !== -1) {
    producers[index] = { ...data, id: data.id ?? "" };
    return Promise.resolve(data);
  }
  const newId = `${producers.length + 1}`;
  const newProducer = { ...data, id: newId };
  producers.push(newProducer);
  return Promise.resolve(newProducer);
}

export async function getProducers(
  props: GetProducersProps | null | undefined
) {
  const pageSize = 10;
  const initialIndex = ((props?.page ?? 0) - 1) * pageSize;
  const lastIndex = initialIndex + 10;
  if (props?.name) {
    const producersFiltered = producers.filter(
      (item) =>
        item.producerName
          .toLocaleLowerCase()
          .includes(props?.name?.toLocaleLowerCase() || "") ||
        item.farmName
          .toLocaleLowerCase()
          .includes(props?.name?.toLocaleLowerCase() || "")
    );
    return Promise.resolve({
      rows: producersFiltered.slice(initialIndex, lastIndex),
      count: producersFiltered.length,
    });
  }
  return Promise.resolve({
    rows: producers.slice(initialIndex, lastIndex),
    count: producers.length,
  });
}

export async function getProducer(id: string) {
  const producer = producers.find((item) => item.id === id);
  return Promise.resolve(producer);
}

export async function deleteProducer(id: string) {
  const index = producers.findIndex((item) => item.id === id);
  producers.splice(index, 1);
  await Promise.resolve();
}
