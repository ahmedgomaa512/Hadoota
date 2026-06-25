import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import Page from '../components/Page';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

const governorates = ['Cairo', 'Giza', 'Alexandria', 'Hurghada', 'Mansoura', 'Tanta', 'Aswan'];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, deliveryFee, total, clearCart, setOrders } = useShop();
  const [address, setAddress] = useState({ name: '', phone: '', address: '', city: 'Cairo' });
  const [payment, setPayment] = useState('Cash on delivery');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const placeOrder = () => {
    const order = {
      id: `hd-${Date.now().toString().slice(-4)}`,
      items: cartItems,
      total,
      payment,
      address,
    };
    setConfirmedOrder(order);
    setOrders((orders) => [order, ...orders]);
    clearCart();
    navigate('/checkout/confirmation');
  };

  if (cartItems.length === 0 && !confirmedOrder) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <Page>
      <header>
        <h1 className="font-heading text-3xl font-bold text-ink">Checkout</h1>
        <p className="text-sm text-gray">Almost there. Let’s send this tale home.</p>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="address" replace />} />
        <Route
          path="address"
          element={
            <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-4">
              <StepLabel step="1" label="Delivery address" />
              <div className="mt-4 grid gap-3">
                <Field label="Name" value={address.name} onChange={(value) => setAddress({ ...address, name: value })} />
                <Field label="Phone" value={address.phone} onChange={(value) => setAddress({ ...address, phone: value })} />
                <Field label="Address" value={address.address} onChange={(value) => setAddress({ ...address, address: value })} />
                <label className="grid gap-1 text-sm font-semibold text-ink">
                  City
                  <select
                    className="h-12 rounded-[8px] border border-light-gray bg-white px-3 text-gray outline-none"
                    value={address.city}
                    onChange={(event) => setAddress({ ...address, city: event.target.value })}
                  >
                    {governorates.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </label>
              </div>
              <Button className="mt-5 w-full" onClick={() => navigate('/checkout/payment')}>
                Continue to payment
              </Button>
            </section>
          }
        />
        <Route
          path="payment"
          element={
            <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-4">
              <StepLabel step="2" label="Payment method" />
              <div className="mt-4 grid gap-3">
                {['Cash on delivery', 'Card'].map((method) => (
                  <button
                    key={method}
                    className={`flex h-14 items-center justify-between rounded-[8px] border px-4 text-left font-semibold ${
                      payment === method ? 'border-story-pink text-story-pink' : 'border-light-gray text-ink'
                    }`}
                    type="button"
                    onClick={() => setPayment(method)}
                  >
                    {method}
                    {payment === method && <Check size={20} />}
                  </button>
                ))}
              </div>
              <Summary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
              <Button className="mt-5 w-full" onClick={placeOrder}>
                Place order - {formatPrice(total)}
              </Button>
            </section>
          }
        />
        <Route
          path="confirmation"
          element={
            <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-meadow-green/10 text-meadow-green">
                <Check size={28} />
              </div>
              <h2 className="mt-4 font-heading text-3xl font-bold text-ink">Your tale is on its way!</h2>
              <p className="mt-2 text-sm leading-6 text-gray">We’ll bring the toys to your door soon. Get ready for the first chapter.</p>
              {confirmedOrder && (
                <div className="mt-5 rounded-[8px] bg-parchment-cream p-4 text-left text-sm">
                  <div className="flex justify-between font-semibold text-ink">
                    <span>Order {confirmedOrder.id}</span>
                    <span>{formatPrice(confirmedOrder.total)}</span>
                  </div>
                  <p className="mt-2 text-gray">{confirmedOrder.payment}</p>
                  <p className="text-gray">{confirmedOrder.address.city}</p>
                </div>
              )}
              <Button className="mt-5 w-full" onClick={() => navigate('/')}>
                Back home
              </Button>
            </section>
          }
        />
      </Routes>
    </Page>
  );
}

function StepLabel({ step, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-story-pink text-sm font-semibold text-parchment-cream">{step}</span>
      <h2 className="font-heading text-2xl font-bold text-ink">{label}</h2>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-ink">
      {label}
      <input
        className="h-12 rounded-[8px] border border-light-gray bg-white px-3 text-gray outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Summary({ subtotal, deliveryFee, total }) {
  return (
    <div className="mt-5 space-y-3 rounded-[8px] bg-parchment-cream p-4 text-sm">
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
  );
}
