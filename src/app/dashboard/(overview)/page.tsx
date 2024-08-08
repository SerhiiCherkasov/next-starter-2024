import RevenueChart from '@/src/ui/containers/revenue-chart';
import LatestInvoices from '@/src/ui/containers/latest-invoices';
import CardWrapper from '@/src/ui/containers/cards';
import { lusitana } from '@/src/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, InvoiceSkeleton, CardsSkeleton } from '@/src/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview',
};

type DashboardProps = {

};
export default async function Dashboard(props: DashboardProps) {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
         <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
};
