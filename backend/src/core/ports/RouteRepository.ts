import { Route } from "../domain/Route";

export interface RouteRepository {
  getAllRoutes(): Promise<Route[]>;
  setBaseline(routeId: number): Promise<void>;
  getBaselineRoute(): Promise<Route | null>;
  getRouteById(routeId: string): Promise<Route | null>;
  getRoutesByIds(routeIds: string[]): Promise<Route[]>;
}
