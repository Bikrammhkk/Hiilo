import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTitle,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app/app-header';
import Link from 'next/link';
import { InstagramIcon, WhatsAppIcon } from '@/components/app/icons';
import { Separator } from '@/components/ui/separator';
import { LogIn } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FYUG SYLLABUS :: VOCATIONAL COURSE',
  description: 'Syllabus for Vocational Course at Assam University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar side="left">
            <SidebarHeader>
              <SidebarTitle className="sr-only">Menu</SidebarTitle>
              <h2 className="text-lg font-semibold">Contact Me</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Link
                      href="https://wa.me/919954487795"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>WhatsApp</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Link
                      href="https://www.instagram.com/bikram.m1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon className="h-5 w-5" />
                      <span>Instagram</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Link
                      href="https://admin-1rtw.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Admin Login</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <Separator className="my-2" />
              <p className="px-2 text-center text-xs text-muted-foreground">
                Developed by Bikram
              </p>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <AppHeader />
            {children}
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
