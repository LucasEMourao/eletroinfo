export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  category: ServiceCategory;
}

export type ServiceCategory =
  | "conserto"
  | "instalacao"
  | "manutencao"
  | "assistencia";
