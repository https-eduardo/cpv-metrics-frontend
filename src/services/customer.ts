import { FetchCustomerOptions } from "@/types/customer";
import { AxiosInstance } from "axios";

export class CustomerService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getCustomers({ page, pageSize = 10, sort }: FetchCustomerOptions) {
    let sortString = "";
    const contractRelation = `&populate[contratos]=true`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (sort) {
      const sortingFieldName = Object.keys(sort)[0];
      if (sortingFieldName) {
        const sorting = sort[sortingFieldName];

        if (sorting.relation)
          sortString = `&sort=${sorting.relation}.${sortingFieldName}:${sorting.order}`;
        else sortString = `&sort=${sortingFieldName}:${sorting.order}`;
      }
    }

    return this.api.get(
      `clientes?${pagination}${contractRelation}${sortString}`
    );
  }
}
