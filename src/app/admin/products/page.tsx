import Link from 'next/link';
import { getProducts } from '@/lib/store';
import { CATEGORY_NAMES } from '@/data/menu';
import ProductActions from '@/components/admin/ProductActions';

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <header className="adm__head">
        <h1>Products</h1>
        <p>{products.length} items on the menu.</p>
        <Link href="/admin/products/new" className="btn btn--red adm__headbtn"><span className="lbl">+ Add Product</span></Link>
      </header>

      <div className="adm__tablewrap">
        <table className="adm__table">
          <thead>
            <tr>
              <th>Item</th><th>Category</th><th>Price</th><th>Heat</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug}>
                <td>
                  <div className="adm__item">
                    <div className="adm__thumb">
                      {p.img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={p.img} alt="" />
                      ) : (
                        <span className="adm__thumbph">—</span>
                      )}
                    </div>
                    <div>
                      <b>{p.name}</b>
                      <span className="adm__muted">/{p.slug}</span>
                    </div>
                  </div>
                </td>
                <td>{CATEGORY_NAMES[p.cat] || p.cat}</td>
                <td>AED {p.price}</td>
                <td>{'🌶️'.repeat(p.heat) || '—'}</td>
                <td className="adm__rowactions">
                  <Link href={`/admin/products/${p.slug}`} className="adm__link">Edit</Link>
                  <ProductActions slug={p.slug} name={p.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
