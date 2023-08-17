"use client";
import { Monster } from "@/types/icrpg";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

const defaultMonster: Monster = {
  name: "Gerblin",
  hp: 1,
  stats: {
    STR: 2,
    DEX: 2,
  },
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
    {
      name: "Yell for help",
      description:
        "A terrified Gerblin will yell for aid. On his next turn, even if dead by then, 1D4 Goblin friends will arrive",
    },
    {
      name: "Flee and hide",
      description:
        "Run away! Goblings can hide almost anywhere. If they reach a hidey hole, they vanish and recover full HP",
    },
  ],
};

type Action =
  | { type: "updateName"; value: string }
  | { type: "updateHearts"; value: number };

const monsterReducer = (monster: Monster, action: Action): Monster => {
  switch (action.type) {
    case "updateName":
      return { ...monster, name: action.value };
    case "updateHearts":
      return { ...monster, hp: action.value };
    default:
      return action satisfies never;
  }
};

interface IMonsterContext {
  monster: Monster;
  dispatch: Dispatch<Action>;
}

export const MonsterContext = createContext<IMonsterContext | null>(null);

export const MonsterProvider = ({ children }: { children: ReactNode }) => {
  const [monster, dispatch] = useReducer(monsterReducer, defaultMonster);
  return (
    <MonsterContext.Provider value={{ monster, dispatch }}>
      {children}
    </MonsterContext.Provider>
  );
};

export const useMonsterContext = () => {
  const ctx = useContext(MonsterContext);
  if (ctx === null) {
    throw "MonsterContext needs a <MonsterProvider>";
  } else {
    return ctx;
  }
};
