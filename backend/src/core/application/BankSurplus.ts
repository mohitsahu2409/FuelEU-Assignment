import { RouteRepository } from "../ports/RouteRepository";
import { BankRepository } from "../ports/BankRepository";

export class BankSurplus {
  constructor(
    private routeRepo: RouteRepository,
    private bankRepo: BankRepository,
  ) {}

  async execute(routeId: string) {
    const route = await this.routeRepo.getRouteById(routeId);

    if (!route) throw new Error("Route not found");

    const TARGET = 89.3368;
    const energy = route.fuelConsumption * 41000;
    const cb = (TARGET - route.ghgIntensity) * energy;

    if (cb <= 0) {
      throw new Error("Cannot bank deficit or zero CB");
    }

    await this.bankRepo.bankSurplus(routeId, route.year, cb);

    return {
      routeId,
      banked: Number(cb.toFixed(2)),
    };
  }
}
