export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="text-center text-xs">
          &copy; {new Date().getFullYear()} PCPartsPH &mdash; Student Project for IT 2025
        </div>
      </div>
    </footer>
  );
}
