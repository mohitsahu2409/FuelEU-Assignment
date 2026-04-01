import { RouteRepository } from "../ports/RouteRepository";

export class GetComparison {
  constructor(private routeRepo: RouteRepository) {}

  async execute() {
    const baseline = await this.routeRepo.getBaselineRoute();

    if (!baseline) {
      throw new Error("Baseline not set");
    }

    const routes = await this.routeRepo.getAllRoutes();

    const TARGET = 89.3368;

    return routes
      .filter((route) => route.id !== baseline.id)
      .map((route) => {
        const percentDiff =
          (route.ghgIntensity / baseline.ghgIntensity - 1) * 100;

        return {
          routeId: route.routeId,
          ghgIntensity: route.ghgIntensity,
          percentDiff: Number(percentDiff.toFixed(2)),
          compliant: route.ghgIntensity <= TARGET,
        };
      })
      .sort((a, b) => a.percentDiff - b.percentDiff);
  }
}
