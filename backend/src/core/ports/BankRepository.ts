export interface BankRepository {
  bankSurplus(routeId: string, year: number, amount: number): Promise<void>;
  getTotalBanked(routeId: string, year: number): Promise<number>;
  applyBanked(routeId: string, year: number, amount: number): Promise<void>;
}
