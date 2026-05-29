import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/store';
import ProductForm from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div>
      <header className="adm__head">
        <Link href="/admin/products" className="adm__back">← Products</Link>
        <h1>Edit: {product.name}</h1>
        <p>Changes go live on the site immediately.</p>
      </header>
      <ProductForm initial={product} />
    </div>
  );
}
