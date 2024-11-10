import { SortingOption } from "./common";
import { ApiContract } from "./contract";

export type ApiCustomerStatus =
  | "bandeira_verde"
  | "bandeira_amarela"
  | "bandeira_vermelha"
  | "bandeira_branca"
  | "perdido";

export type ApiCustomerClassification = "A" | "B" | "C" | "S";
export type ApiCustomerAddressZone =
  | "Sul"
  | "Sudeste"
  | "Centro Oeste"
  | "Nordeste"
  | "Norte"
  | "Internacional";

export interface ApiCustomerAddress {
  attributes: {
    cidade: string;
    estado: string;
    regiao: ApiCustomerAddressZone;
  };
}

export interface ApiCustomer {
  id: number;
  attributes: {
    nome: string;
    status: ApiCustomerStatus;
    classificacao: ApiCustomerClassification;
    endereco?: ApiCustomerAddress;
    contratos: {
      data?: ApiContract[];
    };
  };
}

export interface FetchCustomerOptions {
  page: number;
  pageSize?: number;
  sort?: SortingOption;
}
