import { useEffect, useState } from "react";
import { getRoutes } from "../../../core/application/useCases/getRoutes";
import { routeApi } from "../../infrastructure/api/routeApi";

const RoutesPage = () => {
  const [routes, setRoutes] = useState<any[]>([]);

  const load = async () => {
    const data = await getRoutes();
    setRoutes(data);
  };

  const handleBaseline = async (id: number) => {
    await routeApi.setBaseline(id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Routes</h2>

      {routes.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No routes available</p>
      ) : (
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-3">Route</th>
              <th>Vessel</th>
              <th>Fuel</th>
              <th>Year</th>
              <th>GHG</th>
              <th>Baseline</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 text-center">
                <td className="p-3 font-medium">{r.routeId}</td>
                <td>{r.vesselType}</td>
                <td>{r.fuelType}</td>
                <td>{r.year}</td>
                <td>{r.ghgIntensity}</td>

                <td>
                  {r.isBaseline ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleBaseline(r.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
                  >
                    Set
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoutesPage;
