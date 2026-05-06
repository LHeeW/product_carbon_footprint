"use client";

import { useCompanyByIdQuery } from "@/app/hooks/tanstacks/query/useCompanyQuery";
import TableBody from "./table-body";
import { useCompanyStore } from "@/app/stores/useCompanyStore";

export default function TableContainer() {
  const selectedId = useCompanyStore((state) => state.selectedId);
  const { data: selectedCompany } = useCompanyByIdQuery(selectedId);

  if (!selectedCompany || Object.keys(selectedCompany).length === 0) return null;
  return (
    <section className="p-4 rounded-2xl shadow-xl bg-white">
      <h2 className="text-xl font-bold text-green-700 tracking-tighter">
        {selectedCompany.name} - 배출 데이터 테이블
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr className="font-bold -tracking-widest">
            <th className="px-8 py-4">일자</th>
            <th className="px-8 py-4">활동 유형</th>
            <th className="px-8 py-4 text-right">량</th>
          </tr>
        </thead>
        <TableBody company={selectedCompany} />
      </table>
    </section>
  );
}
