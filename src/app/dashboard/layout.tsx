import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-xl font-bold tracking-tight">
              Business OS
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Executive
              </Link>
              <Link href="/dashboard/crm" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                CRM
              </Link>
              <Link href="/dashboard/hr" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                HR
              </Link>
              <Link href="/dashboard/finance" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Finance
              </Link>
              <Link href="/dashboard/projects" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Projects
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Company Switcher (Placeholder)</div>
            <Button variant="outline" size="sm">
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-muted/40 p-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}