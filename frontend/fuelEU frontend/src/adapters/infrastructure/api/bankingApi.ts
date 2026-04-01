import { API } from "../../../shared/http/axiosInstance";

export const bankingApi = {
  getCB: async (routeId: string) =>
    (await API.get(`/compliance/cb?routeId=${routeId}`)).data,

  bank: async (routeId: string) =>
    (await API.post("/banking/bank", { routeId })).data,

  apply: async (routeId: string, amount: number) =>
    (
      await API.post("/banking/apply", {
        routeId,
        year: 2024,
        amount,
      })
    ).data,
};
