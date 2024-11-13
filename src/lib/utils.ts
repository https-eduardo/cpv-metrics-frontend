import { type ClassValue, clsx } from "clsx";
import { eachMonthOfInterval } from "date-fns";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import { ApiCustomer } from "@/types/customer";
import { format } from "date-fns";
import { ApiContract } from "@/types/contract";
import { ApiCampaign } from "@/types/campaign";
import { ApiReport } from "@/types/report";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

export function getCustomerMonthlyIncome(customer: ApiCustomer) {
  return (
    customer.attributes.contratos?.data?.reduce(
      (t, { attributes }) => t + attributes.mensalidade,
      0
    ) || 0
  );
}

export function getCustomerLtv(customer: ApiCustomer) {
  return (
    customer.attributes.contratos?.data?.reduce(
      (t, { attributes }) => t + attributes.ltv,
      0
    ) || 0
  );
}

export function formatMoney(value: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export function formatDateToApi(value: Date) {
  return format(value, "yyyy-MM-dd");
}

export function getContractsPeriod(contracts: ApiContract[]) {
  const dates: Date[] = contracts.reduce((dates: Date[], contract) => {
    const startDate = contract.attributes.dataInicio;
    if (startDate) dates.push(startDate);
    return dates;
  }, []);

  const sortedDates = dates.sort();
  const olderDate = sortedDates[0];
  const newerDate = sortedDates[sortedDates.length - 1];

  const monthsInInterval = eachMonthOfInterval({
    start: olderDate,
    end: newerDate,
  });

  return monthsInInterval;
}

export function getContractsFromCustomer(customers: ApiCustomer[]) {
  return customers.reduce((contracts: ApiContract[], customer) => {
    const contract = customer.attributes.contratos.data;
    if (contract) contracts.push(...contract);
    return contracts;
  }, []);
}

export function sortContractsByStartDate(contracts: ApiContract[]) {
  return contracts.sort(
    (a, b) =>
      new Date(a.attributes.dataInicio).getTime() -
      new Date(b.attributes.dataInicio).getTime()
  );
}

export function getReportsFromCampaign(campaigns: ApiCampaign[]) {
  return campaigns.reduce((reports: ApiReport[], campaign) => {
    const report = campaign.attributes.relatorios.data;
    if (report) reports.push(...report);
    return reports;
  }, []);
}

export function getCampaignCost(campaign: ApiCampaign) {
  return (
    campaign.attributes.relatorios?.data?.reduce(
      (t, { attributes }) => t + attributes.custo,
      0
    ) || 0
  );
}

export function getCampaignCostPerConversion(campaign: ApiCampaign) {
  return (
    campaign.attributes.relatorios?.data?.reduce(
      (t, { attributes }) => t + attributes.custoPorConversao,
      0
    ) || 0
  );
}