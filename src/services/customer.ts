import { formatDateToApi } from "@/lib/utils";
import { FetchCustomerOptions } from "@/types/customer";
import { AxiosInstance } from "axios";
import { DateRange } from "radix-vue";
import { getLocalTimeZone } from "@internationalized/date";

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

  async getMetricsCustomer(statusFilter: "all" | "active") {
    let filterString = "";
    const contractRelation = `populate[contratos]=true`;

    if (statusFilter === "active")
      filterString = "&filters[status][$ne]=perdido";

    return this.api.get(`clientes?${contractRelation}${filterString}`);
  }

  async getCustomersGeneralInfo(
    periodFilter: DateRange,
    statusFilter: "all" | "active"
  ) {
    let filterString = "";

    if (statusFilter === "active")
      filterString = "&filters[status][$ne]=perdido";

    const contractRelation = `populate[contratos][fields][0]=mensalidade&[contratos][fields][1]=ltv`;
    if (periodFilter.start) {
      const startDate = formatDateToApi(
        periodFilter.start.toDate(getLocalTimeZone())
      );
      let endDate = startDate;

      if (periodFilter.end)
        endDate = formatDateToApi(periodFilter.end!.toDate(getLocalTimeZone()));

      // Initial date between filter
      // filterString += `&filters[$or][0][contratos][dataInicio][$between]=${startDate}&filters[$or][0][contratos][dataInicio][$between]=${endDate}`;
      // // End contract date between filter
      // filterString += `&filters[$or][1][contratos][dataFinal][$between]=${startDate}&filters[$or][1][contratos][dataFinal][$between]=${endDate}`;
    }

    return this.api.get(
      `clientes/general-info?${contractRelation}${filterString}`
    );
  }
}
