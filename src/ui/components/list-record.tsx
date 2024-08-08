import Image from 'next/image';
import { lusitana } from '@/src/ui/fonts';
import clsx from 'clsx';

type ListRecordProps = {
  item: {
    id: string;
    image_url: string;
    name: string;
    email: string;
    amount: string;
  };
  index: number;
};

export default function ListRecord({ item, index }: ListRecordProps) {
  return (
    <div
      className={clsx('flex flex-row items-center justify-between py-4', {
        'border-t': index !== 0,
      })}
    >
      <div className="flex items-center">
        <Image
          src={item.image_url}
          alt={`${item.name}'s profile picture`}
          className="mr-4 rounded-full"
          width={32}
          height={32}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold md:text-base">{item.name}</p>
          <p className="hidden text-sm text-gray-500 sm:block">{item.email}</p>
        </div>
      </div>
      <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>{item.amount}</p>
    </div>
  );
}
