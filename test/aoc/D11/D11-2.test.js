import fn from './D11-2.js';
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("11-2", () => {

  it("11-2 ex", () => {
    let input = readFileSync(path.resolve(__dirname, "./D11ex.txt"), "utf8");

    let rows = input.split(/[\r\n]+/g);
    let grid = rows.map(row => row.split("").map(Number));

    expect(fn(grid)).toBe(195);
  })

  it("11-2 main", () => {
    let input = readFileSync(path.resolve(__dirname, "./D11.txt"), "utf8");
    let rows = input.split(/[\r\n]+/g);
    let grid = rows.map(row => row.split("").map(Number));

    expect(fn(grid)).toBe(210);
  })

})
