import { bankingApi } from "../../../adapters/infrastructure/api/bankingApi";

export const bankSurplus = (routeId: string) => bankingApi.bank(routeId);
