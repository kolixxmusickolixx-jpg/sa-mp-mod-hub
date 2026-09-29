import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import heroImage from "@/assets/mod-neon-city.jpg";
import { AppHeader, ModCard, PageSkeleton, ScreenShell } from "@/components/marketplace-ui";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/hooks/use-marketplace";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Lunaris Mods — моды для SA-MP" },
    { name: "description", content: "Каталог проверенных модов и готовых систем для серверов SA-MP." },
    { property: "og:title", content: "Lunaris Mods — моды для SA-MP" },
    { property: "og:description", content: "Каталог проверенных модов и готовых систем для серверов SA-MP." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const filters = ["Все", "Бесплатные", "Платные"] as const;

function HomePage() {
  const { mods, isLoading } = useMarketplace();
  const [filter, setFilter] = useState<(typeof filters)[number]>("Все");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visibleMods = useMemo(() => mods.filter((mod) => {
    const inFilter = filter === "Все" || (filter === "Бесплатные" ? mod.price === 0 : mod.price > 0);
    return inFilter && mod.name.toLowerCase().includes(query.toLowerCase());
  }), [filter, mods, query]);

  return (
    <ScreenShell>
      <AppHeader title="Lunaris Mods" action={<Button aria-label="Поиск" variant="ghost" size="icon" onClick={() => setSearchOpen((value) => !value)}><Search /></Button>} />
      <main className="market-grid min-h-screen">
        <section className="relative h-72 overflow-hidden">
          <img src={heroImage} alt="Неоновый автомобиль в ночном городе" width={1280} height={800} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-price"><Sparkles className="size-4" />НОВАЯ КОЛЛЕКЦИЯ</div>
              <h1 className="max-w-xs text-3xl font-black leading-tight">Прокачай свой<br /><span className="text-primary">SA-MP сервер</span></h1>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">Проверенные моды, готовые системы и установка за несколько минут.</p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pt-4">
          {searchOpen && (
            <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 44 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти мод..." autoFocus className="mb-3 w-full rounded-md border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-primary" />
          )}
          <div className="grid grid-cols-3 gap-1 rounded-md bg-card p-1" role="tablist">
            {filters.map((item) => <Button key={item} size="sm" variant="ghost" onClick={() => setFilter(item)} className={cn("relative h-9", filter === item && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}>{item}</Button>)}
          </div>
          <div className="mb-4 mt-6 flex items-end justify-between">
            <div><p className="text-xs font-semibold uppercase text-primary">Каталог</p><h2 className="text-xl font-extrabold">Популярные моды</h2></div>
            <span className="text-xs text-muted-foreground">{visibleMods.length} мод.</span>
          </div>
        </section>
        {isLoading ? <PageSkeleton /> : <div className="grid grid-cols-2 gap-3 px-4 pb-8">{visibleMods.map((mod) => <ModCard key={mod.id} mod={mod} />)}</div>}
      </main>
    </ScreenShell>
  );
}