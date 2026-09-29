import { createFileRoute } from "@tanstack/react-router";
import { CircleDollarSign, CreditCard, Edit3, Settings } from "lucide-react";
import { toast } from "sonner";
import { AppHeader, Button, ModCard, ScreenShell, StatusBadge } from "@/components/marketplace-ui";
import { mods, purchases } from "@/lib/marketplace-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Профиль — Lunaris Mods" }, { name: "description", content: "Баланс, покупки и моды пользователя Lunaris Mods." },
    { property: "og:title", content: "Профиль — Lunaris Mods" }, { property: "og:description", content: "Баланс, покупки и моды пользователя." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProfilePage,
});

function ProfilePage() {
  return <ScreenShell><AppHeader title="Профиль" action={<Button aria-label="Настройки" size="icon" variant="ghost"><Settings /></Button>} />
    <main className="market-grid min-h-screen px-4 py-5">
      <section className="flex items-center gap-4"><div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-black shadow-glow">LR</div><div className="min-w-0"><h1 className="truncate text-xl font-extrabold">LUNARRUSSIA</h1><p className="text-xs text-muted-foreground">@lunarrussia · Автор</p></div></section>
      <section className="mt-6 rounded-lg border border-border bg-card p-4 shadow-card"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Доступный баланс</p><p className="mt-1 text-3xl font-black text-price">2 840 ₽</p></div><div className="grid size-11 place-items-center rounded-md bg-price/10 text-price"><CircleDollarSign /></div></div><Button className="mt-4 h-11 w-full" onClick={() => toast.info("Пополнение будет доступно после подключения оплаты")}><CreditCard />Пополнить баланс</Button></section>
      <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-extrabold">Мои покупки</h2><span className="text-xs text-muted-foreground">{purchases.length}</span></div><div className="grid grid-cols-2 gap-3">{purchases.map((mod) => <ModCard key={mod.id} mod={mod} compact />)}</div></section>
      <section className="mt-8 pb-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-extrabold">Мои моды</h2><Button size="sm" variant="ghost" onClick={() => toast.info("Редактор мода открыт в демо-режиме")}><Edit3 />Изменить</Button></div>{mods.filter((mod) => mod.author === "Lunaris Studio").map((mod) => <div key={mod.id} className="mb-3 grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-card p-2"><img src={mod.image} alt="" width={1280} height={800} className="size-16 rounded-md object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold">{mod.name}</p><StatusBadge status={mod.status} /></div><Button aria-label={`Редактировать ${mod.name}`} size="icon" variant="ghost" onClick={() => toast.success("Черновик открыт")}><Edit3 /></Button></div>)}</section>
    </main>
  </ScreenShell>;
}