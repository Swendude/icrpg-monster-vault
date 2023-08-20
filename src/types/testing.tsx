import { Chunk, MonsterGeno } from "./icrpg";

export const chunks: Chunk[] = [
  {
    id: 1,
    name: "Gerblin Ingenuity",
    stats: { STR: 2 },
    efforts: { ULTIMATE: 7 },
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
    id: 2,
    name: "Nimble Body",
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
    id: 3,
    name: "Pack Hunter",
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
  {
    id: 4,
    name: "Black Powder Keg",
    stats: {},
    efforts: {},
    actions: [
      {
        name: "Volatile!",
        description:
          "Don’t stab it! When killed, explodes, doing ULTIMATE to all within NEAR range",
      },
    ],
    hp: 0,
  },
  {
    id: 3,
    name: "Pack Hunter",
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
