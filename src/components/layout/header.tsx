'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';

const NavDropdown = ({
  label,
  subItems,
  baseType,
}: {
  label: string;
  baseType: string;
  subItems: { label: string; query: string }[];
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary focus:outline-none"
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent onMouseLeave={() => setOpen(false)} className="w-56">
        <DropdownMenuLabel>Most Valuable</DropdownMenuLabel>
        {subItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={`/#checker?type=${encodeURIComponent(item.query)}`}>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href={`/#checker?type=${encodeURIComponent(baseType)}`}>Complete List</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const coinTypes = {
    Penny: {
      baseType: 'Penny',
      subItems: [
        { label: 'Lincoln Penny', query: 'Lincoln Penny' },
        { label: 'Indian Head Penny', query: 'Indian Head Penny' },
        { label: 'Flying Eagle Penny', query: 'Flying Eagle Penny' },
      ],
    },
    Nickel: {
      baseType: 'Nickel',
      subItems: [
        { label: 'Jefferson Nickel', query: 'Jefferson Nickel' },
        { label: 'Buffalo Nickel', query: 'Buffalo Nickel' },
        { label: 'Liberty Head V Nickel', query: 'Liberty Head V Nickel' },
      ],
    },
    Dime: {
      baseType: 'Dime',
      subItems: [
        { label: 'Roosevelt Dime', query: 'Roosevelt Dime' },
        { label: 'Mercury Dime', query: 'Mercury Dime' },
        { label: 'Barber Dime', query: 'Barber Dime' },
      ],
    },
    Quarter: {
      baseType: 'Quarter',
      subItems: [
        { label: 'Washington Quarter', query: 'Washington Quarter' },
        { label: 'Standing Liberty Quarter', query: 'Standing Liberty Quarter' },
        { label: 'Barber Quarter', query: 'Barber Quarter' },
      ],
    },
    'Half Dollar': {
      baseType: 'Half Dollar',
      subItems: [
        { label: 'Kennedy Half Dollar', query: 'Kennedy Half Dollar' },
        { label: 'Franklin Half Dollar', query: 'Franklin Half Dollar' },
        { label: 'Walking Liberty Half Dollar', query: 'Walking Liberty Half Dollar' },
      ],
    },
    Dollar: {
      baseType: 'Dollar',
      subItems: [
        { label: 'Eisenhower Dollar', query: 'Eisenhower Dollar' },
        { label: 'Peace Dollar', query: 'Peace Dollar' },
        { label: 'Morgan Dollar', query: 'Morgan Dollar' },
      ],
    },
  };

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block text-xl text-primary">
              Coin Worth Checker
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {Object.entries(coinTypes).map(([label, { baseType, subItems }]) => (
              <NavDropdown
                key={label}
                label={label}
                baseType={baseType}
                subItems={subItems}
              />
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/#about"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setMobileMenuOpen(false)}>
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-xl text-primary">
                      Coin Worth Checker
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {Object.entries(coinTypes).map(([label, { baseType, subItems }]) => (
                      <div key={label} className="flex flex-col gap-2">
                        <h3 className="font-semibold">{label}</h3>
                        {subItems.map((item) => (
                           <Link key={item.label} href={`/#checker?type=${encodeURIComponent(item.query)}`} className="text-foreground/80" onClick={() => setMobileMenuOpen(false)}>
                             {item.label}
                           </Link>
                        ))}
                         <Link href={`/#checker?type=${encodeURIComponent(baseType)}`} className="text-foreground/80" onClick={() => setMobileMenuOpen(false)}>Complete List</Link>
                      </div>
                    ))}
                    <Link href="/#about" className="text-foreground/80" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" className="text-foreground/80" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
