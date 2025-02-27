import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full py-6 px-8 flex items-center">
      <div className="mr-12">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
        >
          ChloroMap
        </Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="space-x-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-black font-bold text-base hover:text-green-600 transition-colors focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-black font-bold text-base hover:text-green-600 transition-colors focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
              Analayze
            </NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-black font-bold text-base hover:text-green-600 transition-colors focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none rounded-md p-3 no-underline outline-none transition-colors hover:bg-slate-50 hover:text-green-600",
              className
            )}
            {...props}
          >
            <div className="text-base font-medium mb-1">{title}</div>
            <p className="text-sm text-slate-500">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Header;
