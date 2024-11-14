import { SortingOption } from "./common";

export type ApiCampaignStatus = "pausada" | "ativa" | "desativada";

export interface ApiCampaign {
  id: number;
  attributes: {
    nome: string;
    status: ApiCampaignStatus;
    relatorio_campanhas: {
      data?: ApiCampaignReport[];
    };
  };
}

export interface ApiCampaignReport {
  id: number;
  attributes: {
    custo: number;
    conversoes: number;
    custoConversao: number;
    clicks: number;
    ctr: number;
    campanha: {
      data?: ApiCampaign;
    };
  };
}

export interface FetchCampaignOptions {
  page: number;
  pageSize?: number;
  sort?: SortingOption;
}
