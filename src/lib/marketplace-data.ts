import neonCity from "@/assets/mod-neon-city.jpg";
import roleplay from "@/assets/mod-roleplay.jpg";
import police from "@/assets/mod-police.jpg";
import gameInterface from "@/assets/mod-interface.jpg";

export type ModStatus = "approved" | "pending" | "rejected";

export type MarketplaceMod = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  installs: number;
  author: string;
  rating: number;
  category: string;
  image: string;
  gallery: string[];
  status: ModStatus;
};

export const mods: MarketplaceMod[] = [
  {
    id: "neon-drift",
    name: "Neon Drift Pack",
    tagline: "Ночной тюнинг и физика дрифта",
    description:
      "Полный набор для атмосферных дрифт-серверов: переработанная физика, неоновая подсветка, дым от шин и готовые настройки автомобилей. Установка занимает меньше трёх минут.",
    price: 490,
    installs: 2840,
    author: "Lunaris Studio",
    rating: 4.9,
    category: "Транспорт",
    image: neonCity,
    gallery: [neonCity, roleplay, gameInterface],
    status: "approved",
  },
  {
    id: "urban-roleplay",
    name: "Urban Roleplay",
    tagline: "Готовая основа для RP-проекта",
    description:
      "Современная сборка игрового режима с экономикой, организациями, недвижимостью и удобной системой администрирования.",
    price: 890,
    installs: 1720,
    author: "West Coast Lab",
    rating: 4.8,
    category: "Gamemode",
    image: roleplay,
    gallery: [roleplay, neonCity, police],
    status: "approved",
  },
  {
    id: "police-pursuit",
    name: "Police Pursuit",
    tagline: "Погони, радары и розыск",
    description:
      "Расширенная система полиции с погонями, радарами, уровнями розыска и синхронизированными спецсигналами.",
    price: 0,
    installs: 5340,
    author: "Vortex Dev",
    rating: 4.7,
    category: "Системы",
    image: police,
    gallery: [police, gameInterface],
    status: "approved",
  },
  {
    id: "nova-hud",
    name: "Nova HUD",
    tagline: "Чистый интерфейс для мобильных игроков",
    description:
      "Адаптивный игровой интерфейс с радаром, показателями персонажа и настройкой цветовой схемы.",
    price: 290,
    installs: 960,
    author: "Lunaris Studio",
    rating: 4.6,
    category: "Интерфейс",
    image: gameInterface,
    gallery: [gameInterface, neonCity],
    status: "pending",
  },
];

export const reviews = [
  { id: 1, author: "Алексей", avatar: "А", rating: 5, text: "Поставил за пару минут. Физика ощущается отлично!", date: "2 дня назад" },
  { id: 2, author: "Maks RP", avatar: "M", rating: 5, text: "Работает стабильно, автор быстро ответил на вопрос.", date: "неделю назад" },
  { id: 3, author: "Denis", avatar: "Д", rating: 4, text: "Красивый пак, хотелось бы ещё пару пресетов.", date: "12 дней назад" },
];

export const purchases = [mods[0], mods[2]];

export function formatPrice(price: number) {
  return price === 0 ? "Бесплатно" : `${price.toLocaleString("ru-RU")} ₽`;
}