import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CircleDollarSign, Edit3, PackagePlus, ShoppingBag, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { AppHeader, Button, ScreenShell, StatusBadge } from "@/components/marketplace-ui";
import { mods } from "@/lib/marketplace-data";

export const Route = createFileRoute("/author")({
  head: () => ({ meta: [
    { title: "Кабинет автора — Lunaris Mods" }, { name: "description", content: "Продажи, доход и публикации автора на Lunaris Mods." },
    { property: "og:title", content: "Кабинет автора — Lunaris Mods" }, { property: "og:description", content: "Управление публикациями автора." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AuthorPage,
});

function AuthorPage() {
  const authorMods = mods.filter((mod) => mod.author === "Lunaris Studio");
  const stats = [{ label: "Продажи", value: "184", icon: ShoppingBag }, { label: "Доход", value: "54 290 ₽", icon: TrendingUp }, { label: "Баланс", value: "18 640 ₽", icon: Banknote }];
  return <ScreenShell><AppHeader title="Кабинет автора" action={<Button aria-label="Добавить мод" size="icon" variant="ghost" onClick={() => toast.info("Создан новый черновик")}><PackagePlus /></Button>} />
    <main className="market-grid min-h-screen px-4 py-5"><div><p className="text-xs font-bold uppercase text-primary">Обзор</p><h1 className="mt-1 text-2xl font-black">Ваши показатели</h1></div>
      <section className="mt-5 grid grid-cols-2 gap-3">{stats.map((stat, index) => { const Icon = stat.icon; return <article key={stat.label} className={`rounded-lg border border-border bg-card p-4 shadow-card ${index === 2 ? "col-span-2" : ""}`}><Icon className="size-5 text-primary" /><p className="mt-4 text-xs text-muted-foreground">{stat.label}</p><p className="mt-1 text-xl font-black text-price">{stat.value}</p></article>; })}</section>
      <Button className="mt-3 h-11 w-full" variant="secondary" onClick={() => toast.success("Заявка на вывод создана")}><CircleDollarSign />Вывести средства</Button>
      <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-extrabold">Мои публикации</h2><span className="text-xs text-muted-foreground">{authorMods.length}</span></div><div className="space-y-3">{authorMods.map((mod) => <article key={mod.id} className="rounded-lg border border-border bg-card p-3"><div className="grid grid-cols-[72px_minmax(0,1fr)_auto] gap-3"><img src={mod.image} alt="" width={1280} height={800} className="h-16 w-[72px] rounded-md object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold">{mod.name}</p><p className="mt-1 text-xs text-price">{mod.price} ₽</p><div className="mt-2"><StatusBadge status={mod.status} /></div></div><Button aria-label={`Редактировать ${mod.name}`} size="icon" variant="ghost" onClick={() => toast.info("Редактор открыт")}><Edit3 /></Button></div></article>)}</div></section>
    </main>
  </ScreenShell>;
}