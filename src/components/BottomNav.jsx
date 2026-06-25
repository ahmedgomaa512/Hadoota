import { NavLink } from 'react-router-dom';
import { Heart, Home, LayoutGrid, User } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-light-gray bg-white md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
                isActive ? 'text-story-pink' : 'text-gray'
              }`
            }
          >
            <Icon size={21} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
