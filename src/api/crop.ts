export interface Crop {
  id: number;
  description: string;
}

const crops: Crop[] = [
  { id: 1, description: "Milho" },
  { id: 2, description: "Soja" },
  { id: 3, description: "Algodão" },
  { id: 4, description: "Café" },
  { id: 5, description: "Cana de Açucar" },
];

export async function getCrops() {
  return Promise.resolve(crops);
}
