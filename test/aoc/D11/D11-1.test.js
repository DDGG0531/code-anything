import fn from './D11-1.js';
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("11-1", () => {

  it("11-1 ex", () => {
    let input = readFileSync(path.resolve(__dirname, "./D11ex.txt"), "utf8");

    let rows = input.split(/[\r\n]+/g);
    let grid = rows.map(row => row.split("").map(Number));

    expect(fn(grid, 100)).toBe(1656);
  })

  it("11-1 main", () => {
    let input = readFileSync(path.resolve(__dirname, "./D11.txt"), "utf8");
    let rows = input.split(/[\r\n]+/g);
    let grid = rows.map(row => row.split("").map(Number));

    expect(fn(grid, 100)).toBe(1634);
  })

})
