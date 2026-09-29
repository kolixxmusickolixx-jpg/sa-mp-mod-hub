import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ShieldCheck, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";
import { ScreenShell } from "@/components/marketplace-ui";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { formatPrice, mods, reviews } from "@/lib/marketplace-data";

export const Route = createFileRoute("/mods/$modId")({
  loader: ({ params }) => {
    const mod = mods.find((item) => item.id === params.modId);
    if (!mod) throw notFound();
    return mod;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Мод"} — Lunaris Mods` },
    { name: "description", content: loaderData?.tagline ?? "Мод для SA-MP" },
    { property: "og:title", content: `${loaderData?.name ?? "Мод"} — Lunaris Mods` },
    { property: "og:description", content: loaderData?.tagline ?? "Мод для SA-MP" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ModDetailPage,
});

function ModDetailPage() {
  const mod = Route.useLoaderData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => emblaApi && setSelected(emblaApi.selectedScrollSnap()), [emblaApi]);
  useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);
  const action = mod.price === 0 ? "Установить" : `Купить за ${formatPrice(mod.price)}`;

  return (
    <ScreenShell withNav={false}>
      <main className="min-h-screen pb-28">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">{mod.gallery.map((image, index) => <div key={image} className="min-w-0 flex-[0_0_100%]"><img src={image} alt={`${mod.name}, изображение ${index + 1}`} width={1280} height={800} className="aspect-[4/3] w-full object-cover" /></div>)}</div>
          </div>
          <div className="absolute inset-0 bg-cover-fade pointer-events-none" />
          <Link to="/" aria-label="Назад" className="absolute left-4 top-4 grid size-10 place-items-center rounded-full border border-border bg-background/75 backdrop-blur-md"><ArrowLeft className="size-5" /></Link>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <div className="flex gap-1.5">{mod.gallery.map((_, index) => <span key={index} className={index === selected ? "h-1.5 w-5 rounded-full bg-primary" : "size-1.5 rounded-full bg-foreground/50"} />)}</div>
            <div className="flex gap-2"><Button size="icon" variant="secondary" className="size-9 rounded-full" onClick={() => emblaApi?.scrollPrev()}><ChevronLeft /></Button><Button size="icon" variant="secondary" className="size-9 rounded-full" onClick={() => emblaApi?.scrollNext()}><ChevronRight /></Button></div>
          </div>
        </div>
        <div className="px-4 py-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="rounded bg-primary/15 px-2 py-1 font-bold text-primary">{mod.category}</span><span className="flex items-center gap-1 text-rating"><Star className="size-3.5 fill-current" />{mod.rating}</span><span>•</span><span>{mod.installs.toLocaleString("ru-RU")} установок</span></div>
          <h1 className="mt-3 text-3xl font-black">{mod.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">от {mod.author}</p>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground"><ShieldCheck className="size-5 shrink-0 text-success" /><span>Мод проверен командой Lunaris и безопасен для установки.</span></div>
          <section className="mt-7"><h2 className="text-lg font-extrabold">Описание</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{mod.description}</p></section>
          <section className="mt-8"><div className="flex items-center justify-between"><h2 className="text-lg font-extrabold">Отзывы</h2><span className="text-sm text-muted-foreground">{reviews.length}</span></div><div className="mt-3 space-y-3">{reviews.map((review) => <article key={review.id} className="rounded-lg border border-border bg-card p-4"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">{review.avatar}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold">{review.author}</p><p className="text-[10px] text-muted-foreground">{review.date}</p></div><div className="flex items-center gap-1 text-xs text-rating"><Star className="size-3.5 fill-current" />{review.rating}</div></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.text}</p></article>)}</div></section>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-nav/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
          <AlertDialog><AlertDialogTrigger asChild><Button className="h-12 w-full text-sm font-extrabold"><Download />{action}</Button></AlertDialogTrigger><AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg border-border bg-card"><AlertDialogHeader><AlertDialogTitle>{mod.price === 0 ? "Установить мод?" : "Подтвердить покупку?"}</AlertDialogTitle><AlertDialogDescription>{mod.price === 0 ? "Мод появится в разделе ваших покупок." : `${formatPrice(mod.price)} будет списано с баланса.`}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Отмена</AlertDialogCancel><AlertDialogAction onClick={() => toast.success(mod.price === 0 ? "Мод готов к установке" : "Покупка завершена")}>Подтвердить</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
        </div>
      </main>
    </ScreenShell>
  );
}