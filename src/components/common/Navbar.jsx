import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/build', label: 'Build PC' },
  { to: '/compare', label: 'Compare Prices' },
  { to: '/guides', label: 'Build Guides' },
  { to: '/parts', label: 'Part Selector' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 py-3 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded font-medium text-blue-700 hover:bg-blue-100 transition-colors ${location.pathname === link.to ? 'bg-blue-100' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
