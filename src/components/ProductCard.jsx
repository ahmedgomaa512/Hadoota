import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductArt from './ProductArt';
import PriceTag from './PriceTag';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWishlist } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <article className="relative rounded-[8px] border border-light-gray bg-white p-3">
      {product.badge && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-lantern-amber px-2.5 py-1 text-xs font-semibold text-ink">
          {product.badge}
        </span>
      )}
      <button
        className={`absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-light-gray bg-white ${
          wished ? 'text-story-pink' : 'text-gray'
        }`}
        type="button"
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(event) => {
          event.preventDefault();
          toggleWishlist(product.id);
        }}
      >
        <Heart size={18} strokeWidth={2} />
      </button>
      <Link to={`/product/${product.id}`} className="block">
        <ProductArt product={product} index={index} />
        <div className="mt-3">
          <p className="font-heading text-lg font-bold leading-5 text-ink">{product.name}</p>
          <p className="mt-1 min-h-10 text-sm leading-5 text-gray">{product.tale}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <PriceTag value={product.price} />
            <span className="rounded-full bg-parchment-cream px-2.5 py-1 text-xs font-semibold text-gray">{product.ageRange}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
