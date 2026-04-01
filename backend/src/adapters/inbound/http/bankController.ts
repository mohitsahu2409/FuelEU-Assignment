import { BankRepositoryPG } from "../../outbound/postgres/BankRepositoryPG";
import { BankSurplus } from "../../../core/application/BankSurplus";
import { ApplyBanked } from "../../../core/application/ApplyBanked";
import { RouteRepositoryPG } from "../../outbound/postgres/RouteRepositoryPG";
import { Request, Response } from "express";

const repo = new RouteRepositoryPG();

const bankRepo = new BankRepositoryPG();

const bankSurplusUseCase = new BankSurplus(repo, bankRepo);
const applyBankedUseCase = new ApplyBanked(bankRepo);

export const bankHandler = async (req: Request, res: Response) => {
  try {
    const { routeId } = req.body;

    const result = await bankSurplusUseCase.execute(routeId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const applyBankHandler = async (req: Request, res: Response) => {
  try {
    const { routeId, year, amount } = req.body;

    const result = await applyBankedUseCase.execute(routeId, year, amount);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
