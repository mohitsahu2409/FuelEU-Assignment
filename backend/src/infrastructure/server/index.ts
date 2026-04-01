import express from "express";
import cors from "cors";
import {
  getRoutesHandler,
  setBaselineHandler,
} from "../../adapters/inbound/http/routeController";
import { getComparisonHandler } from "../../adapters/inbound/http/routeController";
import { getCBHandler } from "../../adapters/inbound/http/routeController";

import {
  bankHandler,
  applyBankHandler,
} from "../../adapters/inbound/http/bankController";
import { createPoolHandler } from "../../adapters/inbound/http/poolController";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FuelEU Backend Running 🚀");
});

app.get("/routes", getRoutesHandler);
app.post("/routes/:id/baseline", setBaselineHandler);
app.get("/routes/comparison", getComparisonHandler);
app.get("/compliance/cb", getCBHandler);

app.post("/banking/bank", bankHandler);
app.post("/banking/apply", applyBankHandler);
app.post("/pools", createPoolHandler);

const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port http://localhost:${PORT}/`);
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000/");
  });
}
export default app;
