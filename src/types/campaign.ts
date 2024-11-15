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

export interface ApiListCampaignResponse {
  nome: string;
  status: string;
  total_clicks: number;
  total_conversoes: number;
  total_impressoes: number;
  total_custo: number;
  total_ctr: number;
  custo_por_conversao: number;
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
