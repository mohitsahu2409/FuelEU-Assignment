import { RouteRepository } from "../ports/RouteRepository";

export class CreatePool {
  constructor(private routeRepo: RouteRepository) {}

  async execute(routeIds: string[]) {
    const routes = await this.routeRepo.getRoutesByIds(routeIds);

    if (routes.length !== routeIds.length) {
      throw new Error("Some routes not found");
    }

    const TARGET = 89.3368;

    // Calculate CBs
    const members = routes.map((route) => {
      const energy = route.fuelConsumption * 41000;
      const cb = (TARGET - route.ghgIntensity) * energy;

      return {
        routeId: route.routeId,
        cb_before: cb,
        cb_after: cb,
      };
    });

    // Total CB check
    const totalCB = members.reduce((sum, m) => sum + m.cb_before, 0);

    if (totalCB < 0) {
      throw new Error("Pooling not allowed: total CB < 0");
    }

    // Separate surplus & deficit
    const surplus = members.filter((m) => m.cb_before > 0);
    const deficit = members.filter((m) => m.cb_before < 0);

    // Sort
    surplus.sort((a, b) => b.cb_before - a.cb_before);
    deficit.sort((a, b) => a.cb_before - b.cb_before);

    // Greedy allocation
    for (let d of deficit) {
      let needed = -d.cb_after;

      for (let s of surplus) {
        if (needed <= 0) break;

        const available = s.cb_after;

        const transfer = Math.min(available, needed);

        s.cb_after -= transfer;
        d.cb_after += transfer;
        needed -= transfer;
      }
    }

    return {
      members: members.map((m) => ({
        routeId: m.routeId,
        cb_before: Number(m.cb_before.toFixed(2)),
        cb_after: Number(m.cb_after.toFixed(2)),
      })),
      poolSum: Number(totalCB.toFixed(2)),
    };
  }
}
