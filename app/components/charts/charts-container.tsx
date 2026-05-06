import SelectCompany from "./select-company";

export default function ChartsContainer() {
  return (
    <section className="p-4 rounded-2xl shadow-xl bg-white">
      <h2 className="text-xl font-bold text-green-700 tracking-tighter">
        월별 배출 통계 그래프
      </h2>
      <SelectCompany />
    </section>
  );
}
