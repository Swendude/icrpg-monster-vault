export type Dice = "D4" | "D6" | "D8" | "D10" | "D12" | "D20";

export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

export type Stat = (typeof STATS)[number];

export const EFFORTS = [
  ["BASIC", "D4"],
  ["WEAPON", "D6"],
  ["SPECIAL", "D8"],
  ["MAGIC", "D10"],
  ["ULTIMATE", "D12"],
] as const;

export type Effort = (typeof EFFORTS)[number][0];

export type Action = {
  name: string;
  description: string;
};

export type Monster = {
  name: string;
  hp: number;
  stats: Partial<Record<Stat, null | number>>;
  efforts: Partial<Record<Effort, null | number>>;
  actions: Action[];
};
