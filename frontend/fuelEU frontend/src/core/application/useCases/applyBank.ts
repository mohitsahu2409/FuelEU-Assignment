import { bankingApi } from "../../../adapters/infrastructure/api/bankingApi";

export const applyBank = (routeId: string, amount: number) =>
  bankingApi.apply(routeId, amount);
