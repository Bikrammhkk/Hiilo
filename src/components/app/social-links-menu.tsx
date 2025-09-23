'use client';

import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InstagramIcon, WhatsAppIcon } from './icons';

export function SocialLinksMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link
            href="https://wa.me/919954487795"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-3"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>WhatsApp</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="https://www.instagram.com/bikram.m1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-3"
          >
            <InstagramIcon className="h-5 w-5" />
            <span>Instagram</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
