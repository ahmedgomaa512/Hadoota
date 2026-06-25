import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Page from '../components/Page';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

export default function Wishlist() {
  const { wishlist } = useShop();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <Page>
      <header>
        <h1 className="font-heading text-3xl font-bold text-ink">Wishlist</h1>
        <p className="text-sm text-gray">The toys you’re keeping close for later.</p>
      </header>

      {saved.length === 0 ? (
        <section className="mt-8 rounded-[8px] border border-light-gray bg-white p-6 text-center">
          <p className="font-heading text-2xl font-bold text-ink">No favorites yet</p>
          <p className="mt-2 text-sm text-gray">Tap the heart on any toy you love.</p>
          <Button as={Link} to="/" className="mt-5">
            Find a favorite
          </Button>
        </section>
      ) : (
        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {saved.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
      )}
    </Page>
  );
}
