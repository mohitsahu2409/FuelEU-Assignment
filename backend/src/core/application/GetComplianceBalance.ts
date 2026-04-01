import { RouteRepository } from "../ports/RouteRepository";

export class GetComplianceBalance {
  constructor(private routeRepo: RouteRepository) {}

  async execute(routeId: string) {
    const route = await this.routeRepo.getRouteById(routeId);

    if (!route) {
      throw new Error("Route not found");
    }

    const TARGET = 89.3368;

    const energy = route.fuelConsumption * 41000;

    const cb = (TARGET - route.ghgIntensity) * energy;

    return {
      routeId: route.routeId,
      cb: Number(cb.toFixed(2)),
      status: cb > 0 ? "surplus" : "deficit",
    };
  }
}
