import { redirect } from 'next/navigation';


import Navbar from '@/components/compo/Navbar'


export default async function DashboardLayout({
  children,}: {
  children: React.ReactNode

}) {





  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
