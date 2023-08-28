'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type typeRoutes = {
  href: string;
  label: string;
  active: boolean;
}[];

const Menu = () => {
  const pathName = usePathname();
  const params = useParams();

  const routes: typeRoutes = [
    {
      href: '/',
      label: 'Overview',
      active: pathName === `/${params.storeId}`,
    },
    {
      href: 'billboards',
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: 'categories',
      label: 'Categories',
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: 'sizes',
      label: 'Sizes',
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: 'colors',
      label: 'Colors',
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      href: 'products',
      label: 'Products',
      active: pathName === `/${params.storeId}/products`,
    },
    {
      href: 'settings',
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <ul className={'flex items-center px-5 gap-4'}>
      {routes.map((route) => {
        return (
          <li key={route.href}>
            <Link
              href={`/${params.storeId}/${route.href}`}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground',
              )}
            >
              {route.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
