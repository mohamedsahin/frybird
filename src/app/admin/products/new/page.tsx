import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <header className="adm__head">
        <Link href="/admin/products" className="adm__back">← Products</Link>
        <h1>Add Product</h1>
        <p>Create a new menu item. It goes live on the site immediately.</p>
      </header>
      <ProductForm />
    </div>
  );
}
