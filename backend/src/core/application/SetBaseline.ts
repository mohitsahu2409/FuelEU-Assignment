import { RouteRepository } from "../ports/RouteRepository";

export class SetBaseline {
  constructor(private routeRepo: RouteRepository) {}

  async execute(routeId: number) {
    await this.routeRepo.setBaseline(routeId);
  }
}
