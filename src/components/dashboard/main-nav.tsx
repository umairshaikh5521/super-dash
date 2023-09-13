"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    href: "/",
  },
  {
    title: "Users",
    href: "/users",
  },
  {
    title: "Product",
    href: "/profile/appearance",
  },
  {
    title: "Settings",
    href: "/profile/account",
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex lg:flex-row lg:items-center lg:space-x-4 lg:space-x-6 lg:bg-transparent lg:static transition-all ease-linear ",
        className
      )}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            pathname === item.href
              ? "text-sm font-medium transition-colors hover:text-primary"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
