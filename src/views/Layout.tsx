import { Outlet, NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { ScanFace } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const isCameraRoute = location.pathname === '/face';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <ScanFace className="size-5" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-tight">
                Facevote V2
              </div>
              <div className="text-xs text-muted-foreground">
                Local face voting prototype
              </div>
            </div>
          </div>

          <Button asChild variant="secondary">
            <NavLink to={'/'}>Home</NavLink>
          </Button>
        </div>
      </header>

      <main
        className={
          isCameraRoute ? 'relative' : 'mx-auto max-w-5xl px-4 py-8 sm:px-6'
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
