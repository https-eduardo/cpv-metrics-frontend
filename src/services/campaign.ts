import { formatDateToApi } from "@/lib/utils";
import { AxiosInstance } from "axios";
import { DateRange } from "radix-vue";
import { getLocalTimeZone } from "@internationalized/date";

export class CampaignService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getCampaignList(
    page: number,
    periodFilter?: DateRange,
    statusFilter?: "all" | "active",
    filterName?: string,
    sortable?: string,
    sortOrder?: string,
    pageSize = 10
  ) {
    let queryString = "&filterActive=false";
    const paginationString = `pageSize=${pageSize}&page=${page}`;

    if (statusFilter === "active") queryString = "&filterActive=true";

    if (sortable && sortOrder)
      queryString += `&sort=${sortable}&sortOrder=${sortOrder}`;

    if (filterName) queryString += `&filterName=${filterName}`;

    if (periodFilter?.start) {
      const startDate = formatDateToApi(
        periodFilter.start.toDate(getLocalTimeZone())
      );
      queryString += `&start=${startDate}`;

      if (periodFilter.end) {
        const endDate = formatDateToApi(
          periodFilter.end!.toDate(getLocalTimeZone())
        );
        queryString += `&end=${endDate}`;
      }
    }

    return this.api.get(`campanhas/list?${paginationString}${queryString}`);
  }

  async getCampaignGeneralInfo(
    periodFilter: DateRange,
    statusFilter: "all" | "active"
  ) {
    let filterString = "filterOnlyActive=false";

    if (statusFilter === "active") filterString = "filterOnlyActive=true";

    if (periodFilter.start) {
      const startDate = formatDateToApi(
        periodFilter.start.toDate(getLocalTimeZone())
      );
      filterString += `&start=${startDate}`;

      if (periodFilter.end) {
        const endDate = formatDateToApi(
          periodFilter.end!.toDate(getLocalTimeZone())
        );
        filterString += `&end=${endDate}`;
      }
    }

    return this.api.get(`relatorio-campanhas/general-info?${filterString}`);
  }
}
