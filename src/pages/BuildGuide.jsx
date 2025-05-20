// src/pages/BuildGuide.jsx
import { useEffect, useState } from 'react';

export default function BuildGuide() {
  const [builds, setBuilds] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState(null);

  useEffect(() => {
    fetch('/mockData/builds.json')
      .then(res => res.json())
      .then(setBuilds);
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Build Guide</h2>
      <p className="mb-4 text-gray-700">Explore sample PC builds for different needs and budgets.</p>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select a build:</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedBuild || ''}
          onChange={e => setSelectedBuild(Number(e.target.value))}
        >
          <option value="" disabled>Select a build...</option>
          {builds.map(build => (
            <option key={build.id} value={build.id}>{build.name}</option>
          ))}
        </select>
      </div>
      {selectedBuild && (
        <BuildDetails buildId={selectedBuild} />
      )}
    </div>
  );
}

function BuildDetails({ buildId }) {
  const [build, setBuild] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch('/mockData/builds.json')
      .then(res => res.json())
      .then(builds => setBuild(builds.find(b => b.id === buildId)));
    fetch('/mockData/components.json')
      .then(res => res.json())
      .then(setComponents);
  }, [buildId]);

  if (!build) return null;
  return (
    <div className="mt-4 border rounded p-4 bg-white shadow">
      <h3 className="font-semibold mb-2">{build.name}</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {build.parts.map(pid => {
          const part = components.find(c => c.id === pid);
          return part ? (
            <li key={pid}>{part.name} <span className="text-xs text-gray-400">({part.type})</span></li>
          ) : null;
        })}
      </ul>
    </div>
  );
}
