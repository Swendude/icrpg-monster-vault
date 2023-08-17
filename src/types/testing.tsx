import { Chunk, MonsterGeno } from "./icrpg";

const chunks: Chunk[] = [
  {
    name: "Gerblin Ingenuity",
    description: "Gerblins are crafty, especially with crafty things",
    stats: { STR: 2 },
    efforts: {},
    actions: [
      {
        name: "Crummy Weapon",
        description: "WEAPON, with equipment no one wants to steal",
      },
      {
        name: "Home Made Bow",
        description: "WEAPON, cannot shoot beyond NEAR distance... too puny",
      },
    ],
    hp: 0,
  },
  {
    name: "Nimble Body",
    description: "Small but quick",
    stats: { DEX: 2 },
    efforts: {},
    actions: [
      {
        name: "Flee and hide",
        description:
          "Run away! This creature can hide almost anywhere. If they reach a hidey hole, they vanish and recover full HP",
      },
    ],
    hp: 1,
  },
  {
    name: "Pack Hunter",
    description: "Strength in numbers",
    stats: {},
    efforts: {},
    actions: [
      {
        name: "Alert the pack!",
        description:
          "Release a terrible scream, next TURN 1D4 creatures of the same type arrive",
      },
    ],
    hp: 0,
  },
];

export const gerblinGenome: MonsterGeno = {
  name: "Chunky Gerblin",
  chunks: [chunks[0], chunks[1], chunks[2]],
};
