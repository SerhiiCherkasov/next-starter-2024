import Image from 'next/image';
import InvoiceStatus from '@/src/ui/invoices/status';
import { formatCurrency, formatDateToLocal } from '@/src/lib/utils';
import { DeleteInvoice, UpdateInvoice } from '@/src/ui/invoices/buttons';

export type Item = {
  id: string;
  image_url: string;
};

type InvoiceCardProps = {
  item: Record<string, string | number | undefined>;
};

export function InvoiceCard({ item }: InvoiceCardProps) {
  return (
    <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <Image
              src={String(item.image_url)}
              className="mr-2 rounded-full"
              width={28}
              height={28}
              alt={`${item.name}'s profile picture`}
            />
            <p>{item.name}</p>
          </div>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
        <InvoiceStatus status={String(item.status)} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">{formatCurrency(Number(item.amount))}</p>
          <p>{formatDateToLocal(String(item.date))}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateInvoice id={String(item.id)} />
          <DeleteInvoice id={String(item.id)} />
        </div>
      </div>
    </div>
  );
}
