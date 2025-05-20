export default function About() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">About PCPartsPH</h2>
      <p className="mb-2 text-gray-700">PCPartsPH is a student project by 3rd-year IT students, aiming to help Filipino PC builders find compatible parts and the best local deals.</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Built with React + Vite + Tailwind CSS</li>
        <li>Prototype uses mock data for demo purposes</li>
        <li>Focused on the Philippine PC market</li>
      </ul>
    </div>
  );
}
