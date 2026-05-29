import { CartProvider } from '@/components/CartContext';
import { ProductsProvider } from '@/components/ProductsContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Effects from '@/components/Effects';
import MobileTabBar from '@/components/MobileTabBar';
import OrderBar from '@/components/OrderBar';
import Toast from '@/components/Toast';
import { SparkCursor } from '@/components/Doodle';
import { getProducts, getLocations } from '@/lib/store';
import type { ReactNode } from 'react';

// Reads the live product catalogue per request so admin edits show up.
export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [products, locations] = await Promise.all([getProducts(), getLocations()]);
  const cities = locations.filter((l) => !l.isPlaceholder).map((l) => l.name);
  return (
    <ProductsProvider products={products}>
      <CartProvider>
        <Nav />
        <main>{children}</main>
        <Footer cities={cities} />
        <CartDrawer />
        <OrderBar />
        <MobileTabBar />
        <Toast />
        <SparkCursor />
        <Effects />
      </CartProvider>
    </ProductsProvider>
  );
}
