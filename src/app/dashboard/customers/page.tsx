import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

type CustomersProps = {

};

export default function Customers(props: CustomersProps) {
  return (
    <div>
      <h1>Customers Page</h1>
    </div>
  );
};
