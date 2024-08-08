import { TableHeader } from '@/src/types';

type HeadProps = {
  headers: TableHeader[];
};

export default function Head({ headers }: HeadProps) {
  return (
    <thead className="rounded-lg text-left text-sm font-normal">
      <tr>
        {headers.map((header, index) => (
          <th key={index} scope="col" className={header.classes || 'px-3 py-5 font-medium'}>
            {header.screenReadersOnly ? <span className="sr-only">{header.title}</span> : header.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
