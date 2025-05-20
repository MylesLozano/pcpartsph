export default function Header() {
  return (
    <header className="w-full bg-blue-700 text-white py-4 px-6 flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-wide">PCPartsPH</span>
      </div>
      <span className="text-xs opacity-80">Your Filipino PC Builder Companion</span>
    </header>
  );
}
