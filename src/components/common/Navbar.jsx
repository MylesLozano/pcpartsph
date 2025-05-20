import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/build', label: 'Build PC' },
  { to: '/compare', label: 'Compare Prices' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white shadow flex gap-4 px-6 py-2 items-center">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-3 py-1 rounded font-medium text-blue-700 hover:bg-blue-100 transition-colors ${location.pathname === link.to ? 'bg-blue-100' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
