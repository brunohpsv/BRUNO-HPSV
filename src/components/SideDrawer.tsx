import { useEffect } from 'react';
import { ChevronRight, ShoppingBag, X } from 'lucide-react';
import {
  CATALOG_ITEMS,
  COLLECTIONS_SERIES,
  JOURNAL_DISPATCHES,
  type CatalogItem,
} from '../data/catalog';

export type DrawerTab = 'shop' | 'collections' | 'journal' | 'cart' | null;

export interface CartEntry {
  uid: string;
  item: CatalogItem;
}

interface SideDrawerProps {
  activeDrawer: DrawerTab;
  onClose: () => void;
  cart: CartEntry[];
  onAddToCart: (item: CatalogItem) => void;
  onRemoveFromCart: (uid: string) => void;
  onCheckout: () => void;
}

const DRAWER_META: Record<
  Exclude<DrawerTab, null>,
  { title: string; subtitle?: string }
> = {
  shop: { title: 'Catalog', subtitle: 'Featured Garments' },
  collections: { title: 'Archive 2026', subtitle: 'Season Lineup' },
  journal: { title: 'Editorial', subtitle: 'Latest Dispatches' },
  cart: { title: 'Shopping Bag' },
};

export function SideDrawer({
  activeDrawer,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}: SideDrawerProps) {
  useEffect(() => {
    if (!activeDrawer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDrawer, onClose]);

  if (!activeDrawer) return null;

  const meta = DRAWER_META[activeDrawer];

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className="relative z-50 w-full h-full bg-white text-black border-l border-gray-200 flex flex-col justify-between overflow-y-auto"
        style={{
          maxWidth: 'var(--drawer-max)',
          padding: 'var(--drawer-pad)',
        }}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-gray-200">
            <div>
              <h2
                className="font-orbitron font-bold uppercase tracking-[0.12em] text-black"
                style={{ fontSize: 'var(--logo)' }}
              >
                {meta.title}
              </h2>
              {meta.subtitle && (
                <p
                  className="mt-1 uppercase tracking-[0.2em] text-gray-500 font-medium"
                  style={{ fontSize: 'var(--micro)' }}
                >
                  {meta.subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 -mr-1.5 text-black hover:opacity-50 transition-opacity cursor-pointer"
            >
              <X strokeWidth={1.5} style={{ width: 'var(--icon)', height: 'var(--icon)' }} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="mt-6">
            {activeDrawer === 'shop' && (
              <ul className="divide-y divide-gray-200">
                {CATALOG_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    className="py-5 first:pt-0 flex items-end justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <span
                        className="block uppercase tracking-[0.2em] text-gray-500 font-medium"
                        style={{ fontSize: 'var(--micro)' }}
                      >
                        {item.tag}
                      </span>
                      <h3
                        className="mt-1.5 font-semibold uppercase tracking-[0.08em] text-black"
                        style={{ fontSize: 'var(--body)' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-1 text-gray-600 tabular-nums font-medium"
                        style={{ fontSize: 'var(--body)' }}
                      >
                        {item.priceFormatted}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="shrink-0 whitespace-nowrap border border-gray-400 px-4 py-2 rounded-md uppercase tracking-[0.18em] font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-150 cursor-pointer"
                      style={{ fontSize: 'var(--micro)' }}
                    >
                      ADD
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {activeDrawer === 'collections' && (
              <ul className="divide-y divide-gray-200">
                {COLLECTIONS_SERIES.map((series) => (
                  <li key={series.id} className="py-5 first:pt-0">
                    <h3
                      className="font-orbitron font-bold uppercase tracking-[0.1em] text-black"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {series.title}
                    </h3>
                    <p
                      className="mt-2 text-gray-600 leading-relaxed"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {series.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {activeDrawer === 'journal' && (
              <ul className="divide-y divide-gray-200">
                {JOURNAL_DISPATCHES.map((entry) => (
                  <li key={entry.id} className="py-5 first:pt-0">
                    <div
                      className="flex items-center gap-2 uppercase tracking-[0.2em] text-gray-500 font-medium"
                      style={{ fontSize: 'var(--micro)' }}
                    >
                      <span>{entry.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.readTime}</span>
                    </div>
                    <h3
                      className="mt-2 font-semibold uppercase tracking-[0.08em] text-black leading-snug"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {entry.title}
                    </h3>
                  </li>
                ))}
              </ul>
            )}

            {activeDrawer === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <ShoppingBag
                      strokeWidth={1.25}
                      className="text-gray-400 mb-4"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                    <p
                      className="text-gray-600 font-medium"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      Your shopping bag is empty.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {cart.map((entry) => (
                      <li
                        key={entry.uid}
                        className="py-4 first:pt-0 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <h3
                            className="font-semibold uppercase tracking-[0.08em] text-black truncate"
                            style={{ fontSize: 'var(--body)' }}
                          >
                            {entry.item.title}
                          </h3>
                          <p
                            className="mt-1 text-gray-600 tabular-nums font-medium"
                            style={{ fontSize: 'var(--body)' }}
                          >
                            {entry.item.priceFormatted}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(entry.uid)}
                          className="shrink-0 whitespace-nowrap uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors cursor-pointer"
                          style={{ fontSize: 'var(--micro)' }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          {activeDrawer === 'cart' ? (
            cart.length > 0 ? (
              <button
                type="button"
                onClick={onCheckout}
                className="w-full bg-black text-white py-3.5 px-5 rounded-md flex items-center justify-center gap-2 uppercase tracking-[0.2em] font-semibold hover:bg-black/85 transition-colors cursor-pointer"
                style={{ fontSize: 'var(--body)' }}
              >
                <span>CHECKOUT NOW</span>
                <ChevronRight strokeWidth={1.75} className="w-4 h-4" />
              </button>
            ) : (
              <p
                className="text-center uppercase tracking-[0.2em] text-gray-400"
                style={{ fontSize: 'var(--micro)' }}
              >
                LGPSM © 2026 — FUTURE FORWARD FASHION
              </p>
            )
          ) : (
            <p
              className="text-center uppercase tracking-[0.2em] text-gray-400"
              style={{ fontSize: 'var(--micro)' }}
            >
              LGPSM © 2026 — FUTURE FORWARD FASHION
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
