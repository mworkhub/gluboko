import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Lead } from "@/lib/types";
import type { ServiceCategory } from "@/content/services";
import { StatusSelect } from "./StatusSelect";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeadsTable({ category, leads }: { category: ServiceCategory; leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-white/60 p-12 text-center text-sm text-slate">
        Поки що немає заявок.
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Дата</TableHead>
            <TableHead>Ім&rsquo;я</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Тип послуги</TableHead>
            <TableHead>Коментар</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="whitespace-nowrap text-slate">{formatDate(lead.created_at)}</TableCell>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                <a href={`tel:${lead.phone}`} className="hover:text-gold">
                  {lead.phone}
                </a>
              </TableCell>
              <TableCell className="text-slate">{lead.service_type ?? "—"}</TableCell>
              <TableCell className="max-w-[220px] truncate text-slate" title={lead.comment ?? ""}>
                {lead.comment ?? "—"}
              </TableCell>
              <TableCell>
                <StatusSelect category={category} leadId={lead.id} status={lead.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
