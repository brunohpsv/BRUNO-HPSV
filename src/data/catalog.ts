export const HERO_BASE_IMAGE =
  '/src/assets/images/user_hero_blue_suit_1795547759839.jpg';

export const HERO_REVEAL_IMAGE =
  '/src/assets/images/user_hero_black_suit_1795547772294.jpg';

export interface CatalogItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  tag: string;
}

export interface CollectionSeries {
  id: string;
  title: string;
  description: string;
}

export interface JournalDispatch {
  id: string;
  date: string;
  title: string;
  readTime: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'cyber-tex-overcoat',
    title: 'CYBER-TEX OVERCOAT',
    price: 850,
    priceFormatted: '$850',
    tag: 'LIMITED EDITION',
  },
  {
    id: 'geo-mesh-tech-hoodie',
    title: 'GEO-MESH TECH HOODIE',
    price: 320,
    priceFormatted: '$320',
    tag: 'NEW DROP',
  },
  {
    id: 'orbital-tapered-trousers',
    title: 'ORBITAL TAPERED TROUSERS',
    price: 290,
    priceFormatted: '$290',
    tag: 'IN STOCK',
  },
  {
    id: 'modular-all-weather-vest',
    title: 'MODULAR ALL-WEATHER VEST',
    price: 410,
    priceFormatted: '$410',
    tag: 'PRE-ORDER',
  },
];

export const COLLECTIONS_SERIES: CollectionSeries[] = [
  {
    id: 'series-01',
    title: 'SERIES 01 — SYNTHETIC HORIZONS',
    description:
      'Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.',
  },
  {
    id: 'series-02',
    title: 'SERIES 02 — KINETIC FORM',
    description:
      'Ergonomic streetwear designed for maximum mobility and temperature equilibrium.',
  },
  {
    id: 'series-03',
    title: 'SERIES 03 — MONOCHROME ZERO',
    description:
      'Pure black and white structural tailoring crafted from 100% recycled polymers.',
  },
];

export const JOURNAL_DISPATCHES: JournalDispatch[] = [
  {
    id: 'aug-2026',
    date: 'AUG 2026',
    title: 'THE ARCHITECTURE OF NEXT-GEN TEXTILES',
    readTime: '4 MIN READ',
  },
  {
    id: 'jul-2026',
    date: 'JUL 2026',
    title: 'CIRCULAR DESIGN IN HIGH-END APPAREL',
    readTime: '6 MIN READ',
  },
  {
    id: 'jun-2026',
    date: 'JUN 2026',
    title: 'MINIMALISM AS A FUNCTIONAL STATEMENT',
    readTime: '3 MIN READ',
  },
];
