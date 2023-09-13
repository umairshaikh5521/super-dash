"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      <nav
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-auto",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* <div className={cn(" md:hidden w-[100%] ", className)}>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>

              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start"
                  )}
                >
                  <SelectItem value={item.title}>{item.title}</SelectItem>
                </Link>
              ))}
         
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </>
  );
}
