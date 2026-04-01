import { useState } from "react";
import RoutesPage from "./adapters/ui/pages/Routes";
import ComparePage from "./adapters/ui/pages/Compare";
import BankingPage from "./adapters/ui/pages/Banking";
import PoolingPage from "./adapters/ui/pages/Pooling";

function App() {
  const [tab, setTab] = useState("routes");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        🚢 FuelEU Maritime Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          { key: "routes", label: "Routes" },
          { key: "compare", label: "Compare" },
          { key: "banking", label: "Banking" },
          { key: "pooling", label: "Pooling" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              tab === t.key
                ? "bg-blue-600 text-white shadow"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {tab === "routes" && <RoutesPage />}
        {tab === "compare" && <ComparePage />}
        {tab === "banking" && <BankingPage />}
        {tab === "pooling" && <PoolingPage />}
      </div>
    </div>
  );
}

export default App;
