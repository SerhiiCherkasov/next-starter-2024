import { InvoiceCard } from '@/src/ui/components/cards/invoice-card';
import Head from '@/src/ui/components/table/head';
import { TableHeader } from '@/src/types';
import TableRow from '@/src/ui/components/table/table-row';

type TableProps = {
  headers: TableHeader[];
  items: Array<Record<string, string | number | undefined>>;
};

export function Table({ headers, items }: TableProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <div className="md:hidden">
        {items?.map((item) => (
          <InvoiceCard key={item.id} item={item} />
        ))}
      </div>
      <table className="hidden min-w-full text-gray-900 md:table">
        <Head headers={headers} />
        <tbody className="bg-white">
          {items?.map((item, index) => (
            <TableRow key={item.id || index} item={item} headers={headers} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
