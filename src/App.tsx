import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import { HERO_BASE_IMAGE, type CatalogItem } from './data/catalog';
import { ImageRevealBackground } from './components/ImageRevealBackground';
import { SideDrawer, type CartEntry, type DrawerTab } from './components/SideDrawer';
import {
  CheckerboardGrid,
  CornerBL,
  CornerBR,
  CornerTL,
  CornerTR,
  WireframeGlobe,
} from './components/SvgMarks';

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerTab>(null);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = (item: CatalogItem) => {
    const uid = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setCart((prev) => [...prev, { uid, item }]);
    showToast(`Added "${item.title}" to your shopping bag.`);
  };

  const handleRemoveFromCart = (uid: string) => {
    setCart((prev) => prev.filter((entry) => entry.uid !== uid));
  };

  const handleCheckout = () => {
    setCart([]);
    setActiveDrawer(null);
    showToast('Order submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden">
      {/* Desktop interactive dual-image spotlight reveal & parallax grid */}
      <ImageRevealBackground />

      {/* 1. Header */}
      <header
        className="relative z-20 flex items-center justify-between"
        style={{
          paddingInline: 'var(--pad-x)',
          paddingTop: 'var(--header-pt)',
          paddingBottom: 'var(--section-gap)',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveDrawer(null)}
          className="flex items-start font-orbitron font-black tracking-[0.15em] text-black hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style={{ fontSize: 'var(--logo)' }}
        >
          <span>LGPSM</span>
          <span
            className="-mt-0.5 ml-0.5 leading-none"
            style={{ fontSize: 'var(--logo-deg)' }}
            aria-hidden="true"
          >
            ˚
          </span>
        </button>

        <nav
          className="flex items-center font-medium uppercase tracking-[0.2em]"
          style={{ gap: 'var(--gap-nav)', fontSize: 'var(--nav)' }}
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => setActiveDrawer('shop')}
            className="hover:opacity-50 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          >
            SHOP
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawer('collections')}
            className="hover:opacity-50 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          >
            COLLECTIONS
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawer('journal')}
            className="hover:opacity-50 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          >
            JOURNAL
          </button>

          <span className="text-gray-300 select-none" aria-hidden="true">
            |
          </span>

          <button
            type="button"
            onClick={() => setActiveDrawer('cart')}
            aria-label={`Open shopping bag (${cart.length} items)`}
            className="relative hover:opacity-50 transition-opacity shrink-0 cursor-pointer flex items-center"
          >
            <ShoppingBag
              strokeWidth={1.5}
              style={{ width: 'var(--icon)', height: 'var(--icon)' }}
            />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-black text-white text-[10px] font-semibold tabular-nums flex items-center justify-center leading-none">
                {cart.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      {/* 2. Main Hero */}
      <main
        className="relative z-10 flex-1 flex flex-col justify-between lg:flex-row lg:items-center gap-12"
        style={{
          paddingInline: 'var(--pad-x)',
          paddingBlock: 'var(--main-py)',
        }}
      >
        {/* Left block (vertically centered) */}
        <div className="flex flex-col items-start">
          <CornerTL className="text-black mb-4" />

          <h1
            className="font-orbitron font-extrabold uppercase tracking-[0.08em] leading-[1.05] text-black"
            style={{ fontSize: 'var(--headline)' }}
          >
            <span className="block">FUTURE</span>
            <span className="block">FORWARD</span>
            <span className="flex items-center gap-3 sm:gap-4">
              <span>FASHION</span>
              <CheckerboardGrid className="text-black translate-y-[2px] shrink-0" />
            </span>
          </h1>

          <CornerBL className="text-black mt-4" />

          <button
            type="button"
            onClick={() => setActiveDrawer('shop')}
            className="group mt-8 inline-flex items-center border border-gray-400 rounded-md uppercase font-semibold tracking-[0.18em] text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            style={{
              fontSize: 'var(--body)',
              paddingInline: 'var(--btn-px)',
              paddingBlock: 'var(--btn-py)',
              gap: 'var(--btn-gap)',
            }}
          >
            <span>SHOP NOW</span>
            <ArrowUpRight
              strokeWidth={1.75}
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ width: 'var(--icon)', height: 'var(--icon)' }}
            />
          </button>
        </div>

        {/* Right lower feature block */}
        <div
          className="relative self-end flex flex-col items-start gap-4"
          style={{
            minWidth: 'var(--feature-min)',
            padding: 'var(--feature-pad)',
          }}
        >
          <CornerTL className="absolute top-0 left-0 text-black" />
          <CornerTR className="absolute top-0 right-0 text-black" />
          <CornerBL className="absolute bottom-0 left-0 text-black" />
          <CornerBR className="absolute bottom-0 right-0 text-black" />

          <WireframeGlobe className="text-black" />

          <div
            className="font-semibold uppercase tracking-[0.18em] leading-relaxed text-black"
            style={{ fontSize: 'var(--body)' }}
          >
            <p>BEYOND TRENDS.</p>
            <p>BUILT FOR TOMORROW.</p>
          </div>
        </div>
      </main>

      {/* Mobile / Tablet static visual section below hero */}
      <section
        className="lg:hidden relative z-10 pb-8"
        style={{ paddingInline: 'var(--pad-x)' }}
      >
        <div className="w-full aspect-[4/5] sm:aspect-[16/9] border border-gray-200 bg-white overflow-hidden">
          <img
            src={HERO_BASE_IMAGE}
            alt="LGPSM Future Forward Fashion lookbook showcase"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 3. Side Drawers */}
      <SideDrawer
        activeDrawer={activeDrawer}
        onClose={() => setActiveDrawer(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Top-right Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-50 bg-black text-white px-4 py-3 rounded-md flex items-center gap-2.5 shadow-sm max-w-sm"
          style={{ fontSize: 'var(--body)' }}
        >
          <Check strokeWidth={2} className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
