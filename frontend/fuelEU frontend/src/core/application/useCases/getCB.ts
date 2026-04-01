import { bankingApi } from "../../../adapters/infrastructure/api/bankingApi";

export const getCB = (routeId: string) => bankingApi.getCB(routeId);
