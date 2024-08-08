import { UpdateInvoice, DeleteInvoice } from '@/src/ui/invoices/buttons';
import InvoiceStatus from '@/src/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/src/lib/utils';
import { fetchFilteredInvoices } from '@/src/lib/data';
import {Table} from "@/src/ui/components/table";
import {TableHeader} from "@/src/types";

export const invoicesTableHeaders: TableHeader[] = [
  {
    title: 'Customer',
    slug: 'name',
    avatar: {
      sourceName: 'image_url',
      alt: 'customer avatar',
    },
    classes: 'px-4 py-5 font-medium sm:pl-6'
  },
  {
    title: 'Email',
    slug: 'email',
  },
  {
    title: 'Amount',
    slug: 'amount',
    formatter: formatCurrency,
  },
  {
    title: 'Date',
    slug: 'date',
    formatter: formatDateToLocal,
  },
  {
    title: 'Status',
    slug: 'status',
    children: [
      {
        element: (status) =>  <InvoiceStatus status={status} />,
        propName: 'status',
      }
    ]
  },
  {
    title: 'Edit',
    slug: 'id',
    classes: 'relative py-3 pl-6 pr-3',
    dataClasses: 'whitespace-nowrap py-3 pl-6 pr-3',
    children: [
      {
        element: (id) => <UpdateInvoice id={id} />,
        propName: 'id',
      },
      {
        element: (id) => <DeleteInvoice id={id}/>,
        propName: 'id',
      },
    ],
    screenReadersOnly: true,
  },
]

export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <Table headers={invoicesTableHeaders} items={invoices} />
      </div>
    </div>
  );
}
