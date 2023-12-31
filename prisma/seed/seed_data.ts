import { Prisma } from "@prisma/client";

export const chunks: Prisma.ChunkUncheckedCreateInput[] = [
  {
    id: 1,
    name: "Magma core",
    hp: 1,
    magic: 2,
    basic: 1,
    int: 2,
  },
  {
    id: 2,
    name: "Undead",
    hp: 1,
    con: 2,
    basic: 1,
    int: -2,
    cha: -2,
  },
  {
    id: 3,
    name: "Extra Tentacle",
    hp: 1,
  },
  {
    id: 4,
    name: "Thick hide",
    hp: 1,
    con: 2,
  },
  {
    id: 5,
    name: "Strong",
    hp: 0,
    str: 2,
  },
  {
    id: 6,
    name: "Fast",
    hp: 0,
    dex: 2,
  },
  {
    id: 7,
    name: "Wise",
    hp: 0,
    wis: 2,
  },
  {
    id: 8,
    name: "Though",
    hp: 0,
    con: 2,
  },
  {
    id: 9,
    name: "Smart",
    hp: 0,
    int: 2,
  },
  {
    id: 10,
    name: "Social",
    hp: 0,
    cha: 2,
  },
];

export const actions: Prisma.ActionUncheckedCreateInput[] = [
  {
    id: 1,
    name: "Heat Burst",
    description: "Expand the heat, enemies within FAR take BASIC damage",
    chunkId: 1,
  },
  {
    id: 2,
    name: "Explode",
    description:
      "The creature explodes, anything withing FAR takes MAGIC damage",
    chunkId: 1,
  },
  {
    id: 3,
    name: "Fragile corpse",
    description:
      "When the creature is below HALF hp, it can no longer move because it's legs have collapsed",
    chunkId: 2,
  },
  {
    id: 4,
    name: "Fear of the good",
    description:
      "Any magical object associated with a religion or force of good will make this creature fear and move away",
    chunkId: 2,
  },
  {
    id: 5,
    name: "Tentacle Grab",
    description:
      "TARGET must succeed on a HARD DEX check or you pull it in to CLOSE",
    chunkId: 3,
  },
  {
    id: 6,
    name: "Tough",
    description:
      "The creature has a thick skin, and only takes 1/2 WEAPON damage.",
    chunkId: 4,
  },
  {
    id: 7,
    name: "Slow",
    description: "The creature can't RUN",
    chunkId: 4,
  },
];
