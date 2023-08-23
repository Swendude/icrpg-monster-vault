"use client";
import { Chunk, Monster, MonsterGeno, toFeno } from "@/lib/icrpg";
import { gerblinGenome } from "@/lib/testing";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type Action = { type: "updateName"; value: string };

// type MonsterState = {

// }

const monsterReducer = (monster: MonsterGeno, action: Action): MonsterGeno => {
  switch (action.type) {
    case "updateName":
      return { ...monster, name: action.value };
    default:
      return monster;
  }
};

interface IMonsterContext {
  monster: Monster;
  dispatch: Dispatch<Action>;
}

export const MonsterContext = createContext<IMonsterContext | null>(null);

export const MonsterProvider = ({
  children,
  chunkCatalog,
}: {
  children: ReactNode;
  chunkCatalog: Chunk[];
}) => {
  const [monsterGeno, dispatch] = useReducer(monsterReducer, gerblinGenome);
  return (
    <MonsterContext.Provider
      value={{ monster: toFeno(monsterGeno, chunkCatalog), dispatch }}
    >
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
