import { SortingOption } from "./common";
import { ApiReport } from "./report";

export type ApiCampaignStatus =
  | "pausada"
  | "ativa"
  | "desativa"

export interface ApiCampaign {
  id: number;
  attributes: {
    campanha: string;
    status: ApiCampaignStatus;
    relatorios: {
      data?: ApiReport[];
    };
  };
}

export interface FetchCampaignOptions {
  page: number;
  pageSize?: number;
  sort?: SortingOption;
}
