import React from 'react';
import prismadb from '@/lib/prismadb';
import { Heading } from '@/app/(dashboard)/components/heading';

interface InterfaceDashboard {
  params: {
    storeId: string;
  };
}

const Dashboard: React.FC<InterfaceDashboard> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      <div className={'container pt-5'}>
        <Heading
          title={'Dashboard'}
          description={'Welcome to ' + store?.name}
        />
      </div>
    </div>
  );
};

export default Dashboard;
