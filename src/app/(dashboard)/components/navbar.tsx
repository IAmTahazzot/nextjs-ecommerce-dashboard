import { auth, UserButton } from '@clerk/nextjs';
import Menu from '@/app/(dashboard)/components/menu';
import StoreSwitcher from '@/app/(dashboard)/components/store-switch';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import Theme from '@/app/(dashboard)/components/theme';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className={'border-b'}>
      <div className='container flex h-16 items-center'>
        <StoreSwitcher items={stores} />
        <Menu />
        <div className='ml-auto flex items-center space-x-4'>
          <Theme />
          <UserButton afterSignOutUrl={'/'} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
