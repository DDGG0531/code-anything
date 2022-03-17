import fn from './D8-1.js';
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("8-1", () => {

  it("8-1 main", () => {
    let input = readFileSync(path.resolve(__dirname, "./D8.txt"), "utf8");
    let rows = input.split(/[\r\n]+/g);
    rows = rows.map(str => {
      let [front, back] = str.split(" | ");
      let exampleArr = front.split(" ");
      let testArr = back.split(" ");
      return {
        exampleArr,
        testArr
      }
    })


    expect(fn(rows)).toBe(493);
  })

})
