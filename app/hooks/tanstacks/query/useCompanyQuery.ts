import { Company } from "@/app/types/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { companyKeys } from "../query-keys";
import { fetchCompanies } from "@/app/lib/api";

export const useCompaniesQuery = <TData = Company[]>(
  options?: Omit<
    UseSuspenseQueryOptions<Company[], Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: companyKeys.all,
    queryFn: fetchCompanies,
    ...options,
  });
};

export const useCompanyByIdQuery = <TData = Company>(
  id:string,
  options?: Omit<
    UseSuspenseQueryOptions<Company[], Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: companyKeys.all,
    queryFn: fetchCompanies,
    select: (companies) => {
      const selectedId = id || (companies[0]?.id ?? "");
      if (!selectedId) return null as unknown as TData;
      const company = companies.find((company) => company.id === selectedId);
      return company;
    },
    ...options,
  });
};
