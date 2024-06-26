"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard`,
      label: 'Overview',
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/brands`,
      label: 'Brands',
      active: pathname === `/dashboard/brands`,
    },
    {
      href: `/dashboard/categories`,
      label: 'Categories',
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/sizes`,
      label: 'Sizes',
      active: pathname === `/dashboard/sizes`,
    },
    {
      href: `/dashboard/colors`,
      label: 'Colors',
      active: pathname === `/dashboard/colors`,
    },
    {
      href: `/dashboard/products`,
      label: 'Products',
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: 'Orders',
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/settings`,
      label: 'Settings',
      active: pathname === `/dashboard/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
