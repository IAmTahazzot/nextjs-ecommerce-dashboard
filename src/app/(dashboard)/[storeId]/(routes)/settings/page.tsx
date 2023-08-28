import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import SettingsForm from '@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
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
    <div className='flex-col'>
      <div className='container pt-5'>
        <div className='flex-1'>
          <SettingsForm initialData={store} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
