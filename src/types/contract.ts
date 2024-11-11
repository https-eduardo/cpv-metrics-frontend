import { ApiCustomer } from "./customer";

export type ApiContractSituation = "aberto" | "perdido";

export interface ApiContract {
  id: number;
  attributes: {
    dataInicio?: Date;
    dataFinal?: Date;
    situacao: ApiContractSituation;
    mensalidade: number;
    ltv: number;
    mesesContratuais?: number;
    cliente: {
      data?: ApiCustomer;
    };
  };
}
