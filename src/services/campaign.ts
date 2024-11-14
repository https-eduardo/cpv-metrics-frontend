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
