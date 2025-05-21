export default function Header() {
  return (
    <header className="w-full bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-wide">PCPartsPH</span>
          </div>
          <span className="text-xs opacity-80">Your Filipino PC Builder Companion</span>
        </div>
      </div>
    </header>
  );
}
