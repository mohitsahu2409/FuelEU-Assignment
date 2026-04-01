import { API } from "../../../shared/http/axiosInstance";

export const routeApi = {
  getRoutes: async () => (await API.get("/routes")).data,

  setBaseline: async (id: number) => await API.post(`/routes/${id}/baseline`),

  getComparison: async () => (await API.get("/routes/comparison")).data,
};
