import { formatDateToApi } from "@/lib/utils";
import { FetchCampaignOptions } from "@/types/campaign";
import { AxiosInstance } from "axios";
import { DateRange } from "radix-vue";
import { getLocalTimeZone } from "@internationalized/date";

export class CampaignService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getCampaigns({ page, pageSize = 10, sort }: FetchCampaignOptions) {
    let sortString = "";
    const reportRelation = `&populate[relatorios]=true`;
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
      `campanhas?${pagination}${reportRelation}${sortString}`
    );
  }

  async getMetricsCampaign(statusCampaignFilter: "all" | "active") {
    let filterString = "";
    const reportRelation = `populate[relatorios]=true`;

    if (statusCampaignFilter === "active")
      filterString = "&filters[status][$ne]=desativa";

    return this.api.get(`campanhas?${reportRelation}${filterString}`);
  }

  async getCustomersGeneralInfo(
    periodFilter: DateRange,
  ) {
    let filterString = "";

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
