import { API } from "../../../shared/http/axiosInstance";

export const poolApi = {
  createPool: async (routeIds: string[]) =>
    (await API.post("/pools", { routeIds })).data,
};
