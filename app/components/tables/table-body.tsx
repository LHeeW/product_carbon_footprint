import { Company } from "@/app/types/types";
import { EMISSION_UNIT } from "@/app/utils/emission-factor";

export default function TableBody({ company }: { company: Company }) {
  return (
    <tbody className="divide-y divide-slate-50">
      {company.emissions.map((c, i) => {
        const unit = EMISSION_UNIT[c.source] || "kg";

        return (
          <tr
            key={`${c.yearMonth}-${c.source}-${c.description}-${c.emissions}-${i}`}
            className="hover:bg-slate-50 transition"
          >
            <td className="px-8 py-4 text-xl">{c.yearMonth}</td>
            <td className="px-8 py-4">
              <span className="text-xl">{c.source}</span>
              <span> - </span>
              <span className="text-sm text-slate-400">{c.description}</span>
            </td>
            <td className="px-8 py-4 text-right">
              <span className="text-xl">{c.emissions} </span>
              <span className="text-sm text-slate-400">{unit}</span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
