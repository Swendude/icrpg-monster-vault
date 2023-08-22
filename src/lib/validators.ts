import { z } from "zod";
import { Prisma } from "@prisma/client";
import { Chunk } from "./icrpg";

const statValidator = z.object({
  STR: z.number(),
  DEX: z.number(),
  CON: z.number(),
  INT: z.number(),
  WIS: z.number(),
  CHA: z.number(),
});

const effortValidator = z.object({
  BASIC: z.number(),
  WEAPON: z.number(),
  SPECIAL: z.number(),
  MAGIC: z.number(),
  ULTIMATE: z.number(),
});

const ActionValidator = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
});

const ChunkValidator = z.object({
  id: z.number().int(),
  name: z.string(),
  hp: z.number(),
  stats: statValidator.partial(),
  efforts: effortValidator.partial(),
  actions: ActionValidator.array().optional(),
});
