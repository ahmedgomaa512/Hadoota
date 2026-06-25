export function formatPrice(value) {
  return `${Math.round(value)} EGP`;
}

export function categoryTone(indexOrName) {
  const names = ['Bedtime & plush', 'Puzzles & learning', 'Outdoor play', 'Arts & crafts', 'Storybooks', 'Baby & toddler'];
  const index = typeof indexOrName === 'number' ? indexOrName : names.indexOf(indexOrName);
  return index % 2 === 0 ? 'text-night-sky-blue bg-night-sky-blue/10' : 'text-meadow-green bg-meadow-green/10';
}

export const variantColors = {
  honey: '#EF9F27',
  rose: '#D4537E',
  cloud: '#D3D1C7',
  sky: '#378ADD',
  leaf: '#639922',
  sun: '#EF9F27',
};
