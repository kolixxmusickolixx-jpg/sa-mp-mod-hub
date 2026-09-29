# SA-MP Mod Hub

Create a Telegram Mini App for a mod marketplace for SA-MP game servers. 

Dark theme (colors: #0f0f17 background, #1a1a24 cards, #8b5cf6 purple accent, #22d3ee cyan for prices).

Pages:
1. Home — hero banner + grid of mod cards (image, name, price in ₽, install count, author). Top tabs: "Все" / "Бесплатные" / "Платные".
2. Mod detail — big cover, gallery (swipeable), description, price, reviews list, "Купить" / "Установить" button (fixed at bottom).
3. Profile — avatar, balance, "Мои покупки" grid, "Мои моды" (if author) with edit buttons.
4. Author dashboard — stats cards (sales, earnings, balance), mod list with statuses (pending/approved/rejected), "Вывести средства" button.
5. Moderator panel (admin only) — table of pending mods, approve/reject buttons, withdrawal requests.

Components:
- Bottom navigation bar (Home / Profile / Author / Admin).
- Modal for confirmations.
- Toast notifications.
- Skeleton loaders while data loads.

Use lucide-react icons, Tailwind, framer-motion for smooth transitions, react-router for navigation. Mobile-first (400px wide).
All data via hooks with mock data (I will replace with real API later).

примерный дизайн на фото

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8a3abc1e-0834-4848-8dbd-a71aa1fdacde).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
