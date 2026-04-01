import { BankRepository } from "../ports/BankRepository";

export class ApplyBanked {
  constructor(private bankRepo: BankRepository) {}

  async execute(routeId: string, year: number, amount: number) {
    const total = await this.bankRepo.getTotalBanked(routeId, year);

    if (amount > total) {
      throw new Error("Not enough banked balance");
    }

    await this.bankRepo.applyBanked(routeId, year, amount);

    return {
      routeId,
      applied: amount,
      remaining: Number((total - amount).toFixed(2)),
    };
  }
}
