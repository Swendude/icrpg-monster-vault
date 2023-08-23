import { Prisma } from "@prisma/client";

export type Dice = "D4" | "D6" | "D8" | "D10" | "D12" | "D20";

export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

export type Stat = (typeof STATS)[number];

const statsKeys: Stat[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const EFFORTS = [
  ["BASIC", "D4"],
  ["WEAPON", "D6"],
  ["SPECIAL", "D8"],
  ["MAGIC", "D10"],
  ["ULTIMATE", "D12"],
] as const;

export type Effort = (typeof EFFORTS)[number][0];

export const effortKeys: Effort[] = [
  "BASIC",
  "WEAPON",
  "SPECIAL",
  "MAGIC",
  "ULTIMATE",
];

export type Action = {
  name: string;
  description: string;
};

export type Monster = {
  name: string;
  hp: number;
  stats: Partial<Record<Stat, number>>;
  efforts: Partial<Record<Effort, number>>;
  actions: Action[];
  chunks: Chunk[];
};

export type Chunk = {
  id: number;
  name: string;
  hp: number;
  stats: Partial<Record<Stat, number>>;
  efforts: Partial<Record<Effort, number>>;
  actions: Action[];
};

type ChunkAttrs = Omit<Chunk, "name" | "description" | "id">;

export type MonsterGeno = {
  name: string;
  chunksIds: number[];
};

const addAttrRecord = <T extends Partial<Record<string, number>>>(
  r1: Partial<T>,
  r2: Partial<T>,
  keys: (keyof T)[],
): Partial<T> => {
  let result: Partial<T> = {};
  for (const key of keys) {
    result = { ...result, [key]: (r1[key] || 0) + (r2[key] || 0) };
  }
  return result;
};

export const addChunk = (g1: ChunkAttrs, g2: ChunkAttrs): ChunkAttrs => {
  return {
    hp: g1.hp + g2.hp,
    stats: addAttrRecord(g1.stats, g2.stats, statsKeys),
    efforts: addAttrRecord(g1.efforts, g2.efforts, effortKeys),
    actions: [...g1.actions, ...g2.actions],
  };
};

export const toFeno = (mg: MonsterGeno, chunkCatalog: Chunk[]): Monster => {
  const chunks = mg.chunksIds
    .map((id) => chunkCatalog.find((c) => c.id === id))
    .filter((c) => c !== undefined) as Chunk[];

  const chunkAttrs: ChunkAttrs[] = chunks.map((c) => {
    const { name, ...attrs } = c;
    return attrs;
  });
  const totalAttrs = chunkAttrs.reduce(addChunk, {
    hp: 0,
    stats: {},
    efforts: {},
    actions: [],
  });
  return {
    name: mg.name,
    ...totalAttrs,
    chunks: chunks,
  };
};

export const dbChunktoClientChunk = (
  c: Prisma.ChunkGetPayload<{
    include: {
      actions: true;
    };
  }>,
): Chunk => {
  return {
    id: c.id,
    name: c.name,
    hp: c.hp,
    efforts: {
      BASIC: c.basic || undefined,
      WEAPON: c.weapon || undefined,
      SPECIAL: c.special || undefined,
      MAGIC: c.magic || undefined,
      ULTIMATE: c.ultimate || undefined,
    },
    stats: {
      STR: c.str || undefined,
      DEX: c.dex || undefined,
      CON: c.con || undefined,
      INT: c.int || undefined,
      WIS: c.wis || undefined,
      CHA: c.cha || undefined,
    },
    actions: c.actions,
  };
};
