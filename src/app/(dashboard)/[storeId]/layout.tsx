import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import Navbar from '@/app/(dashboard)/components/navbar';
import ThemeProvider from '@/providers/theme-provider';

interface DashboardLayoutType {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

const DashboardLayout: React.FC<DashboardLayoutType> = async ({
  children,
  params,
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
