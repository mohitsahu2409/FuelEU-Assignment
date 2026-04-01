import { Request, Response } from "express";
import { GetRoutes } from "../../../core/application/GetRoutes";
import { RouteRepositoryPG } from "../../outbound/postgres/RouteRepositoryPG";
import { GetComparison } from "../../../core/application/GetComparison";
import { GetComplianceBalance } from "../../../core/application/GetComplianceBalance";

import { SetBaseline } from "../../../core/application/SetBaseline";

const repo = new RouteRepositoryPG();

const getRoutesUseCase = new GetRoutes(repo);

const setBaselineUseCase = new SetBaseline(repo);

const getComparisonUseCase = new GetComparison(repo);

const getCBUseCase = new GetComplianceBalance(repo);

export const getRoutesHandler = async (req: Request, res: Response) => {
  try {
    const routes = await getRoutesUseCase.execute();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

export const setBaselineHandler = async (req: Request, res: Response) => {
  try {
    const routeId = Number(req.params.id);

    if (isNaN(routeId)) {
      return res.status(400).json({ error: "Invalid route ID" });
    }

    await setBaselineUseCase.execute(routeId);

    res.json({ message: "Baseline updated successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getComparisonHandler = async (req: Request, res: Response) => {
  try {
    const data = await getComparisonUseCase.execute();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCBHandler = async (req: Request, res: Response) => {
  try {
    const routeId = String(req.query.routeId);

    if (!routeId) {
      return res.status(400).json({ error: "routeId is required" });
    }

    const result = await getCBUseCase.execute(routeId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
