import { ApiCampaign } from "./campaign";

export interface ApiReport {
  id: number;
  attributes: {
    custo: number;
    conversao: number;
    custoPorConversao: number;
    cliques: number;
    ctr: number;
    report: {
      data?: ApiCampaign;
    };
  };
}
