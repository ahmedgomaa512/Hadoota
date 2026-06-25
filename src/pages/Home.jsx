import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, ShoppingBag } from 'lucide-react';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Logo from '../components/Logo';
import Page from '../components/Page';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

const ageRanges = ['0-2y', '3-5y', '6-8y'];

export default function Home() {
  const [selectedAge, setSelectedAge] = useState('0-2y');
  const [search, setSearch] = useState('');
  const { cartCount } = useShop();

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesAge = product.ageRange === selectedAge;
        const query = search.trim().toLowerCase();
        const matchesSearch = !query || `${product.name} ${product.category} ${product.tale}`.toLowerCase().includes(query);
        return matchesAge && matchesSearch;
      }),
    [search, selectedAge],
  );

  return (
    <Page>
      <header className="flex items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-2">
          <Link className="relative flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white text-gray" to="/cart" aria-label="Cart">
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-story-pink px-1 text-xs font-semibold text-parchment-cream">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white text-gray" type="button" aria-label="Notifications">
            <Bell size={21} />
          </button>
        </div>
      </header>

      <label className="mt-5 flex h-12 items-center gap-3 rounded-full border border-light-gray bg-white px-4 text-gray">
        <Search size={20} />
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-gray"
          placeholder="Search toys"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <section className="mt-5 rounded-[8px] bg-story-pink p-5 text-parchment-cream">
        <p className="font-heading text-3xl font-bold leading-8">New tales arrived</p>
        <p className="mt-2 text-sm leading-6">Pick a soft friend or clever puzzle today and enjoy 10% off your next story.</p>
        <Button className="mt-4 bg-parchment-cream text-story-pink-dark" variant="secondary">
          Browse new toys
        </Button>
      </section>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {ageRanges.map((age) => (
          <Chip key={age} selected={age === selectedAge} onClick={() => setSelectedAge(age)}>
            {age}
          </Chip>
        ))}
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink">Picked for bedtime</h1>
            <p className="text-sm text-gray">Small toys with stories tucked inside.</p>
          </div>
          <Link className="text-sm font-semibold text-story-pink" to="/categories">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </Page>
  );
}
