import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../components/Button';
import Page from '../components/Page';
import PriceTag from '../components/PriceTag';
import ProductArt from '../components/ProductArt';
import QuantityStepper from '../components/QuantityStepper';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

export default function Cart() {
  const { cartItems, subtotal, deliveryFee, total, updateQty, removeFromCart } = useShop();

  return (
    <Page className="pb-28">
      <header>
        <h1 className="font-heading text-3xl font-bold text-ink">Your cart</h1>
        <p className="text-sm text-gray">A little bundle of tales, ready when you are.</p>
      </header>

      {cartItems.length === 0 ? (
        <section className="mt-8 rounded-[8px] border border-light-gray bg-white p-6 text-center">
          <p className="font-heading text-2xl font-bold text-ink">Your cart is waiting</p>
          <p className="mt-2 text-sm text-gray">Add a toy you love and come back here to checkout.</p>
          <Button as={Link} to="/" className="mt-5">
            Discover toys
          </Button>
        </section>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            {cartItems.map(({ product, qty }) => (
              <article key={product.id} className="flex gap-3 rounded-[8px] border border-light-gray bg-white p-3">
                <ProductArt product={product} size="small" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-heading text-lg font-bold leading-5 text-ink">{product.name}</h2>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray">{product.tale}</p>
                    </div>
                    <button className="flex h-8 w-8 flex-none items-center justify-center text-gray" type="button" onClick={() => removeFromCart(product.id)} aria-label="Remove">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <PriceTag value={product.price * qty} />
                    <QuantityStepper value={qty} onChange={(nextQty) => updateQty(product.id, nextQty)} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-4">
            <h2 className="font-heading text-xl font-bold text-ink">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray">
                <span>Delivery fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="border-t border-light-gray pt-3">
                <div className="flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-light-gray bg-parchment-cream p-4 md:static md:mt-6 md:border-0 md:bg-transparent md:p-0">
          <div className="mx-auto max-w-5xl">
            <Button as={Link} to="/checkout/address" className="w-full">
              Checkout - {formatPrice(total)}
            </Button>
          </div>
        </div>
      )}
    </Page>
  );
}
