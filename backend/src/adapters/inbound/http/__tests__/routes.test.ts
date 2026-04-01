process.env.NODE_ENV = "test";

import request from "supertest";
import app from "../../../../infrastructure/server/index";
import { describe, it, expect, afterAll } from "@jest/globals";
import { pool } from "../../../../infrastructure/db/client";

describe("GET /routes", () => {
  it("should return all routes", async () => {
    const res = await request(app).get("/routes");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await pool.end();
});
