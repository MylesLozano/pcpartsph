// src/pages/BuildGuide.jsx
import { useEffect, useState } from "react";

export default function BuildGuide() {
  const [builds, setBuilds] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/mockData/builds.json")
      .then((res) => res.json())
      .then((data) => {
        setBuilds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl">Build Guide</h2>
          <p className="mb-4">
            Explore sample PC builds for different needs and budgets.
          </p>

          {loading ? (
            <div className="flex justify-center py-4">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                  <span className="label-text">Select a build:</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedBuild || ""}
                  onChange={(e) => setSelectedBuild(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Select a build...
                  </option>
                  {builds.map((build) => (
                    <option key={build.id} value={build.id}>
                      {build.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedBuild && <BuildDetails buildId={selectedBuild} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BuildDetails({ buildId }) {
  const [build, setBuild] = useState(null);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/mockData/builds.json").then((res) => res.json()),
      fetch("/mockData/components.json").then((res) => res.json()),
    ])
      .then(([buildsData, componentsData]) => {
        setBuild(buildsData.find((b) => b.id === buildId));
        setComponents(componentsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [buildId]);

  if (loading)
    return (
      <div className="flex justify-center py-4">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  if (!build) return null;

  return (
    <div className="mt-6">
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">{build.name}</h3>
          <div className="divider"></div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Component Type</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {build.parts.map((pid) => {
                  const part = components.find((c) => c.id === pid);
                  return part ? (
                    <tr key={pid}>
                      <td>
                        <div className="badge badge-primary">{part.type}</div>
                      </td>
                      <td>{part.name}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Use This Build</button>
          </div>
        </div>
      </div>
    </div>
  );
}
