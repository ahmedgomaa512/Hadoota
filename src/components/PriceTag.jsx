import { formatPrice } from '../utils/format';

export default function PriceTag({ value, className = '' }) {
  return <span className={`font-semibold text-ink ${className}`}>{formatPrice(value)}</span>;
}
