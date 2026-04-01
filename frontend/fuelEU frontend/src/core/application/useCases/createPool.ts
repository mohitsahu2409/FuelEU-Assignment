import { poolApi } from "../../../adapters/infrastructure/api/poolApi";

export const createPool = (routeIds: string[]) => poolApi.createPool(routeIds);
