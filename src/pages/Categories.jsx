import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import Page from '../components/Page';
import { categories } from '../data/products';
import { categoryTone } from '../utils/format';

export default function Categories() {
  return (
    <Page>
      <header>
        <h1 className="font-heading text-3xl font-bold text-ink">Categories</h1>
        <p className="text-sm text-gray">Find the shelf that feels right for today.</p>
      </header>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = Lucide[category.icon] || Lucide.Puzzle;
          return (
            <Link key={category.id} to="/" className="flex items-center gap-4 rounded-[8px] border border-light-gray bg-white p-4">
              <span className={`flex h-14 w-14 items-center justify-center rounded-[8px] ${categoryTone(index)}`}>
                <Icon size={28} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-ink">{category.name}</h2>
                <p className="text-sm text-gray">Open a small new chapter.</p>
              </div>
            </Link>
          );
        })}
      </section>
    </Page>
  );
}
