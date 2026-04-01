import { useState } from "react";
import { getCB } from "../../../core/application/useCases/getCB";
import { bankSurplus } from "../../../core/application/useCases/bankSurplus";
import { applyBank } from "../../../core/application/useCases/applyBank";

const BankingPage = () => {
  const [routeId, setRouteId] = useState("");
  const [cb, setCb] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCB = async () => {
    try {
      const res = await getCB(routeId);
      setCb(res.cb);
      setStatus(res.status);
      setMessage("");
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to fetch CB");
      setCb(null);
    }
  };

  const bank = async () => {
    if (status !== "surplus") {
      setError("❌ Cannot bank: route is not in surplus");
      return;
    }

    try {
      const res = await bankSurplus(routeId);
      setMessage(`✅ Banked: ${res.banked}`);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Banking failed");
    }
  };

  const apply = async () => {
    if (status !== "deficit") {
      setError("❌ Apply is only needed for deficit routes");
      return;
    }

    try {
      const res = await applyBank(routeId, 100000000);

      setMessage(`✅ Applied: ${res.applied} | Remaining: ${res.remaining}`);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Apply failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Banking</h2>

      {/* Input */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4">
        <input
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          placeholder="Enter Route ID (e.g. R002)"
          className="border p-2 rounded mr-2"
        />

        <button
          onClick={fetchCB}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Get CB
        </button>
      </div>

      {/* CB Info */}
      {cb !== null && (
        <div className="mb-4">
          <p>
            <strong>CB:</strong> {cb}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                status === "surplus" ? "text-green-600" : "text-red-500"
              }
            >
              {status}
            </span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={bank}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Bank
        </button>

        <button
          onClick={apply}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Apply
        </button>
      </div>

      {/* Success Message */}
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default BankingPage;
