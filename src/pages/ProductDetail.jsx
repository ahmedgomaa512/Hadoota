import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import Page from '../components/Page';
import PriceTag from '../components/PriceTag';
import ProductArt from '../components/ProductArt';
import QuantityStepper from '../components/QuantityStepper';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { variantColors } from '../utils/format';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0]);
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <Page className="pb-28">
      <header className="flex items-center justify-between">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white text-ink" type="button" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <button
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white ${wished ? 'text-story-pink' : 'text-gray'}`}
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Wishlist"
        >
          <Heart size={21} />
        </button>
      </header>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-start">
        <ProductArt product={product} />
        <section>
          <p className="text-sm font-semibold text-story-pink-dark">{product.category}</p>
          <h1 className="mt-1 font-heading text-4xl font-bold leading-10 text-ink">{product.name}</h1>
          <p className="mt-2 text-base leading-6 text-gray">{product.tale}</p>
          <PriceTag value={product.price} className="mt-4 block text-2xl" />

          {product.variants?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">Color</p>
              <div className="mt-2 flex gap-2">
                {product.variants.map((item) => (
                  <button
                    key={item}
                    className={`h-9 w-9 rounded-full border-2 ${variant === item ? 'border-ink' : 'border-light-gray'}`}
                    style={{ backgroundColor: variantColors[item] }}
                    type="button"
                    aria-label={item}
                    onClick={() => setVariant(item)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between rounded-[8px] border border-light-gray bg-white p-4">
            <span className="font-semibold text-ink">Quantity</span>
            <QuantityStepper value={qty} onChange={setQty} />
          </div>

          <section className="mt-6 rounded-[8px] border border-light-gray bg-white p-4">
            <h2 className="font-heading text-xl font-bold text-ink">About this toy</h2>
            <p className="mt-2 text-sm leading-6 text-gray">{product.description}</p>
            <p className="mt-3 text-sm leading-6 text-gray">Best for ages {product.ageRange}. Made for gentle daily play and easy gifting.</p>
          </section>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-light-gray bg-parchment-cream p-4 md:static md:mt-6 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-5xl gap-3">
          <Button
            className="w-full"
            onClick={() => {
              addToCart(product.id, qty);
              navigate('/cart');
            }}
          >
            <ShoppingBag size={19} />
            Add to cart
          </Button>
          <Button as={Link} to="/cart" className="hidden md:flex" variant="secondary">
            View cart
          </Button>
        </div>
      </div>
    </Page>
  );
}
