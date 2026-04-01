import { RouteRepository } from "../../../core/ports/RouteRepository";
import { Route } from "../../../core/domain/Route";
import { pool } from "../../../infrastructure/db/client";

export class RouteRepositoryPG implements RouteRepository {
  async getAllRoutes(): Promise<Route[]> {
    const result = await pool.query("SELECT * FROM routes");

    return result.rows.map((row) => ({
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: row.ghg_intensity,
      fuelConsumption: row.fuel_consumption,
      distance: row.distance,
      totalEmissions: row.total_emissions,
      isBaseline: row.is_baseline,
    }));
  }
  async setBaseline(routeId: number): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Remove existing baseline
      await client.query("UPDATE routes SET is_baseline = false");

      // Set new baseline
      const result = await client.query(
        "UPDATE routes SET is_baseline = true WHERE id = $1",
        [routeId],
      );

      if (result.rowCount === 0) {
        throw new Error("Route not found");
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
  async getBaselineRoute(): Promise<Route | null> {
    const result = await pool.query(
      "SELECT * FROM routes WHERE is_baseline = true LIMIT 1",
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: row.ghg_intensity,
      fuelConsumption: row.fuel_consumption,
      distance: row.distance,
      totalEmissions: row.total_emissions,
      isBaseline: row.is_baseline,
    };
  }
  async getRouteById(routeId: string): Promise<Route | null> {
    const result = await pool.query(
      "SELECT * FROM routes WHERE route_id = $1 LIMIT 1",
      [routeId],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: row.ghg_intensity,
      fuelConsumption: row.fuel_consumption,
      distance: row.distance,
      totalEmissions: row.total_emissions,
      isBaseline: row.is_baseline,
    };
  }
  async getRoutesByIds(routeIds: string[]): Promise<Route[]> {
    const result = await pool.query(
      "SELECT * FROM routes WHERE route_id = ANY($1)",
      [routeIds],
    );

    return result.rows.map((row) => ({
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: row.ghg_intensity,
      fuelConsumption: row.fuel_consumption,
      distance: row.distance,
      totalEmissions: row.total_emissions,
      isBaseline: row.is_baseline,
    }));
  }
}
