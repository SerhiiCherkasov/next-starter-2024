import React from 'react';
import Image from 'next/image';
import { TableHeader } from '@/src/types';

type TableRowProps = {
  headers: TableHeader[];
  item: Record<string, string | number | undefined>;
};

export default function TableRow({ item, headers }: TableRowProps) {
  const renderChildren = (header: TableHeader) =>
    header.children ? header.children.map((child, index) => child.element(item[child.propName || header.slug])) : null;

  const renderWrappedChildren = (header: TableHeader) =>
    header.children && header.children.length > 1 ? (
      <div className="flex justify-end gap-3">{renderChildren(header)}</div>
    ) : (
      renderChildren(header)
    );

  return (
    <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {headers.map((header, index) => (
        <>
          {header.avatar ? (
            <td className={header.dataClasses || 'whitespace-nowrap py-3 pl-6 pr-3'}>
              <div className="flex items-center gap-3">
                <Image
                  src={String(item[header.avatar.sourceName])}
                  className={header.avatar.className || 'rounded-full'}
                  width={header.avatar.width || 28}
                  height={header.avatar.height || header.avatar.width || 28}
                  alt={header.avatar.alt || 'image'}
                />
                <p>{header.formatter ? header.formatter(item[header.slug] || '') : item[header.slug]}</p>
              </div>
            </td>
          ) : (
            <td className={header.dataClasses || 'whitespace-nowrap px-3 py-3'}>
              {header.children
                ? renderWrappedChildren(header)
                : header.formatter
                ? header.formatter(item[header.slug] || '')
                : item[header.slug]}
            </td>
          )}
        </>
      ))}
    </tr>
  );
}
