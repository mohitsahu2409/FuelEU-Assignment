import { useEffect, useState } from "react";
import { getComparison } from "../../../core/application/useCases/getComparison";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ComparePage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getComparison().then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Compare Routes</h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No comparison data</p>
      ) : (
        <>
          {/* Chart */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-3">GHG Intensity Chart</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="routeId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ghgIntensity" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="p-3">Route</th>
                <th>GHG</th>
                <th>% Diff</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((r) => (
                <tr key={r.routeId} className="border-b text-center">
                  <td className="p-3 font-medium">{r.routeId}</td>
                  <td>{r.ghgIntensity}</td>

                  <td
                    className={
                      r.percentDiff > 0 ? "text-red-500" : "text-green-600"
                    }
                  >
                    {r.percentDiff}%
                  </td>

                  <td>
                    {r.compliant ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-red-500 font-semibold">✘</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ComparePage;
