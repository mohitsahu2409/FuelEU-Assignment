import { useState } from "react";
import { createPool } from "../../../core/application/useCases/createPool";

const PoolingPage = () => {
  const [input, setInput] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [poolSum, setPoolSum] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handlePool = async () => {
    try {
      const routeIds = input.split(",").map((r) => r.trim());
      const res = await createPool(routeIds);

      setMembers(res.members);
      setPoolSum(res.poolSum);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error);
      setMembers([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pooling</h2>

      <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="R002, R004, R005"
          className="border p-2 rounded w-80 mr-2"
        />

        <button
          onClick={handlePool}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Pool
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {members.length > 0 && (
        <>
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="p-3">Route</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>

            <tbody>
              {members.map((m) => (
                <tr key={m.routeId} className="border-b text-center">
                  <td className="p-3">{m.routeId}</td>

                  <td
                    className={
                      m.cb_before >= 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {m.cb_before}
                  </td>

                  <td
                    className={
                      m.cb_after >= 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {m.cb_after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 font-bold">
            Pool Sum:{" "}
            <span className={poolSum! >= 0 ? "text-green-600" : "text-red-500"}>
              {poolSum}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default PoolingPage;
