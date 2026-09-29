import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BarChart3,
  Home,
  ShieldCheck,
  Star,
  Store,
  UserRound,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarketplaceMod, ModStatus } from "@/lib/marketplace-data";
import { formatPrice } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/profile", label: "Профиль", icon: UserRound },
  { to: "/author", label: "Автор", icon: BarChart3 },
  { to: "/admin", label: "Админ", icon: ShieldCheck },
] as const;

export function ScreenShell({ children, withNav = true }: { children: ReactNode; withNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className={cn("mx-auto min-h-screen w-full max-w-md", withNav && "pb-24")}>{children}</div>
      {withNav && <BottomNav />}
    </div>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border/70 bg-nav/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={cn(
                "relative flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-muted-foreground transition-colors",
                active && "text-primary",
              )}
            >
              {active && <motion.span layoutId="nav-active" className="absolute inset-1 rounded-md bg-primary/10" />}
              <Icon className="relative size-5" strokeWidth={active ? 2.5 : 2} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border/60 bg-background/90 px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">
          <Store className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold tracking-wide">{title}</p>
          <p className="text-[10px] uppercase text-muted-foreground">SA-MP marketplace</p>
        </div>
      </div>
      {action}
    </header>
  );
}

export function ModCard({ mod, compact = false }: { mod: MarketplaceMod; compact?: boolean }) {
  return (
    <motion.article whileTap={{ scale: 0.98 }} className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <Link to="/mods/$modId" params={{ modId: mod.id }} className="block">
        <div className={cn("relative overflow-hidden", compact ? "aspect-[1.45/1]" : "aspect-[1.35/1]") }>
          <img src={mod.image} alt={mod.name} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          <div className="absolute inset-0 bg-cover-fade" />
          <span className="absolute left-2 top-2 rounded bg-background/80 px-2 py-1 text-[10px] font-semibold backdrop-blur-md">{mod.category}</span>
        </div>
        <div className="p-3">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <h3 className="min-w-0 truncate text-sm font-bold">{mod.name}</h3>
            <span className="shrink-0 text-sm font-black text-price">{formatPrice(mod.price)}</span>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">{mod.author}</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="size-3.5" />{mod.installs.toLocaleString("ru-RU")}</span>
            <span className="flex items-center gap-1 text-rating"><Star className="size-3.5 fill-current" />{mod.rating}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function StatusBadge({ status }: { status: ModStatus }) {
  const labels = { approved: "Одобрен", pending: "На проверке", rejected: "Отклонён" };
  return <span className={cn("rounded px-2 py-1 text-[10px] font-bold", status === "approved" && "bg-success/15 text-success", status === "pending" && "bg-rating/15 text-rating", status === "rejected" && "bg-destructive/15 text-destructive")}>{labels[status]}</span>;
}

export function PageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4" aria-label="Загрузка">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border border-border bg-card p-2">
          <Skeleton className="aspect-[1.35/1] w-full rounded-md bg-muted" />
          <Skeleton className="h-4 w-4/5 bg-muted" />
          <Skeleton className="h-3 w-1/2 bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">{children}</div>;
}

export { Button };