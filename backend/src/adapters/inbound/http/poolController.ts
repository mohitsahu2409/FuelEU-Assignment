import { Request, Response } from "express";
import { CreatePool } from "../../../core/application/CreatePool";
import { RouteRepositoryPG } from "../../outbound/postgres/RouteRepositoryPG";

const repo = new RouteRepositoryPG();
const createPoolUseCase = new CreatePool(repo);

export const createPoolHandler = async (req: Request, res: Response) => {
  try {
    const { routeIds } = req.body;

    if (!routeIds || routeIds.length === 0) {
      return res.status(400).json({ error: "routeIds required" });
    }

    const result = await createPoolUseCase.execute(routeIds);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
