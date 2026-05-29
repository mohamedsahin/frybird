'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Product } from '@/types';

interface ProductsContextValue {
  products: Product[];
  getProduct: (slug: string) => Product | null;
}

const ProductsContext = createContext<ProductsContextValue>({ products: [], getProduct: () => null });

export function ProductsProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const value: ProductsContextValue = {
    products: products || [],
    getProduct: (slug: string) => (products || []).find((p) => p.slug === slug) || null,
  };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts(): ProductsContextValue {
  return useContext(ProductsContext);
}
