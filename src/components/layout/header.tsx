'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import React from 'react';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const coinTypes = [
    'Penny',
    'Nickel',
    'Dime',
    'Quarter',
    'Half Dollar',
    'Dollar',
  ];

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
            <Link
              href="/"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              Home
            </Link>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                onMouseEnter={() => setOpen(true)}
                className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary focus:outline-none"
              >
                Coin Types
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent onMouseLeave={() => setOpen(false)}>
                {coinTypes.map((type) => (
                  <DropdownMenuItem key={type} asChild>
                    <Link href={`/#checker?type=${encodeURIComponent(type)}`}>{type}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/#about"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="mailto:hpasadkhan@gmail.com"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
            <Button asChild>
                <Link href="#checker">Get Started</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
