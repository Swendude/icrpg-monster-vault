import { gerblinGenome } from "./testing";
import { toFeno } from "./icrpg";

test("Build a gerblin works", () => {
  console.log(toFeno(gerblinGenome));
  expect(toFeno(gerblinGenome)).toBeDefined();
});

test("Build a gerblin results in correct stats", () => {
  expect(toFeno(gerblinGenome).stats.STR).toBe(2);
  expect(toFeno(gerblinGenome).stats.DEX).toBe(2);
});

test("Build a gerblin results in correct amount of actions", () => {
  expect(toFeno(gerblinGenome).actions.length).toBe(4);
});
