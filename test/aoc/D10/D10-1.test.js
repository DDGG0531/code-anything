import fn from './D10-1.js';
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("10-1", () => {

  it("10-1 ex", () => {
    let input = readFileSync(path.resolve(__dirname, "./D10ex.txt"), "utf8");
    let rows = input.split(/[\r\n]+/g);
    let newRows = rows.map(row => {
      let charaters = row.split('');
      let newCharaters = charaters.map(e => e.charCodeAt(0));
      return newCharaters
    })

    expect(fn(newRows)).toBe(26397);
  })

  it("10-1 main", () => {
    let input = readFileSync(path.resolve(__dirname, "./D10.txt"), "utf8");
    let rows = input.split(/[\r\n]+/g);
    let newRows = rows.map(row => {
      let charaters = row.split('');
      let newCharaters = charaters.map(e => e.charCodeAt(0));
      return newCharaters
    })

    expect(fn(newRows)).toBe(392139);
  })

})
