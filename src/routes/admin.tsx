import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock3, Eye, ShieldCheck, WalletCards, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppHeader, Button, EmptyState, ScreenShell } from "@/components/marketplace-ui";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { mods } from "@/lib/marketplace-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Модерация — Lunaris Mods" }, { name: "description", content: "Проверка модов и заявок в Lunaris Mods." },
    { property: "og:title", content: "Модерация — Lunaris Mods" }, { property: "og:description", content: "Проверка модов и заявок." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AdminPage,
});

function AdminPage() {
  const [pending, setPending] = useState(mods.filter((mod) => mod.status === "pending"));
  const [withdrawals, setWithdrawals] = useState([{ id: 1, author: "West Coast Lab", amount: "12 400 ₽" }, { id: 2, author: "Vortex Dev", amount: "8 900 ₽" }]);
  const moderate = (id: string, approved: boolean) => { setPending((items) => items.filter((item) => item.id !== id)); toast.success(approved ? "Мод одобрен" : "Мод отклонён"); };
  return <ScreenShell><AppHeader title="Модерация" action={<div className="grid size-9 place-items-center rounded-md bg-success/15 text-success"><ShieldCheck className="size-5" /></div>} />
    <main className="market-grid min-h-screen px-4 py-5"><div className="grid grid-cols-2 gap-3"><div className="rounded-lg border border-border bg-card p-4"><Clock3 className="size-5 text-rating" /><p className="mt-3 text-2xl font-black">{pending.length}</p><p className="text-xs text-muted-foreground">Ожидают проверки</p></div><div className="rounded-lg border border-border bg-card p-4"><WalletCards className="size-5 text-price" /><p className="mt-3 text-2xl font-black">{withdrawals.length}</p><p className="text-xs text-muted-foreground">Заявки на вывод</p></div></div>
      <section className="mt-8"><h1 className="text-xl font-black">Моды на проверке</h1><div className="mt-4 space-y-3">{pending.length === 0 ? <EmptyState>Очередь модерации пуста</EmptyState> : pending.map((mod) => <article key={mod.id} className="rounded-lg border border-border bg-card p-3"><div className="flex gap-3"><img src={mod.image} alt="" width={1280} height={800} className="h-20 w-24 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{mod.name}</p><p className="mt-1 text-xs text-muted-foreground">{mod.author}</p><p className="mt-2 text-sm font-black text-price">{mod.price} ₽</p></div><Button aria-label="Просмотреть" size="icon" variant="ghost"><Eye /></Button></div><div className="mt-3 grid grid-cols-2 gap-2"><ConfirmAction title="Одобрить мод?" description="Мод появится в каталоге и станет доступен покупателям." action="Одобрить" onConfirm={() => moderate(mod.id, true)}><Button className="w-full bg-success text-background hover:bg-success/90"><Check />Одобрить</Button></ConfirmAction><ConfirmAction title="Отклонить мод?" description="Автор увидит статус «Отклонён» и сможет внести изменения." action="Отклонить" onConfirm={() => moderate(mod.id, false)}><Button className="w-full" variant="destructive"><X />Отклонить</Button></ConfirmAction></div></article>)}</div></section>
      <section className="mt-8 pb-4"><h2 className="text-xl font-black">Заявки на вывод</h2><div className="mt-4 space-y-3">{withdrawals.length === 0 ? <EmptyState>Новых заявок нет</EmptyState> : withdrawals.map((request) => <article key={request.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-card p-4"><div className="min-w-0"><p className="truncate text-sm font-bold">{request.author}</p><p className="mt-1 text-lg font-black text-price">{request.amount}</p></div><ConfirmAction title="Подтвердить выплату?" description={`Заявка ${request.author} будет отмечена как выполненная.`} action="Выплатить" onConfirm={() => { setWithdrawals((items) => items.filter((item) => item.id !== request.id)); toast.success("Выплата подтверждена"); }}><Button size="sm">Выплатить</Button></ConfirmAction></article>)}</div></section>
    </main>
  </ScreenShell>;
}

function ConfirmAction({ children, title, description, action, onConfirm }: { children: React.ReactNode; title: string; description: string; action: string; onConfirm: () => void }) {
  return <AlertDialog><AlertDialogTrigger asChild>{children}</AlertDialogTrigger><AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg border-border bg-card"><AlertDialogHeader><AlertDialogTitle>{title}</AlertDialogTitle><AlertDialogDescription>{description}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Отмена</AlertDialogCancel><AlertDialogAction onClick={onConfirm}>{action}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
}