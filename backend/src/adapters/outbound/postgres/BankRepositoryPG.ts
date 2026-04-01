import { BankRepository } from "../../../core/ports/BankRepository";
import { pool } from "../../../infrastructure/db/client";

export class BankRepositoryPG implements BankRepository {
  async bankSurplus(
    routeId: string,
    year: number,
    amount: number,
  ): Promise<void> {
    await pool.query(
      "INSERT INTO bank_entries (route_id, year, amount_gco2eq) VALUES ($1, $2, $3)",
      [routeId, year, amount],
    );
  }

  async getTotalBanked(routeId: string, year: number): Promise<number> {
    const result = await pool.query(
      "SELECT COALESCE(SUM(amount_gco2eq), 0) as total FROM bank_entries WHERE route_id = $1 AND year = $2",
      [routeId, year],
    );

    return Number(result.rows[0].total);
  }

  async applyBanked(
    routeId: string,
    year: number,
    amount: number,
  ): Promise<void> {
    await pool.query(
      "INSERT INTO bank_entries (route_id, year, amount_gco2eq) VALUES ($1, $2, $3)",
      [routeId, year, -amount], // negative = usage
    );
  }
}
