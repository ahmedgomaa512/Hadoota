import { icons } from '../utils/icons';
import { categoryTone } from '../utils/format';

export default function ProductArt({ product, size = 'large', index = 0 }) {
  const Icon = icons[product.icon] || icons.Puzzle;
  const tone = categoryTone(product.category || index);
  const dimensions = size === 'small' ? 'h-16 w-16 rounded-2xl' : 'aspect-square w-full rounded-[8px]';
  const iconSize = size === 'small' ? 28 : 58;

  if (product.image) {
    return (
      <img
        className={`${dimensions} object-cover`}
        src={product.image}
        alt={product.name}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center ${dimensions} ${tone}`}>
      <Icon size={iconSize} strokeWidth={1.8} />
    </div>
  );
}
