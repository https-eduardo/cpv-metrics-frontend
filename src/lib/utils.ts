import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import { ApiCustomer } from "@/types/customer";

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

export function getCustomerMonthlyFee(customer: ApiCustomer) {
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
