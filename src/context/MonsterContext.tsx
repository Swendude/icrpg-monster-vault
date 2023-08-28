"use client";
import { Chunk, Monster, MonsterGeno, toFeno } from "@/lib/icrpg";
import { gerblinGenome } from "@/lib/testing";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type Action =
  | { type: "updateName"; value: string }
  | { type: "toggleChunk"; chunkId: number };

// type MonsterState = {

// }

const monsterReducer = (monster: MonsterGeno, action: Action): MonsterGeno => {
  switch (action.type) {
    case "updateName":
      return { ...monster, name: action.value };
    case "toggleChunk":
      if (monster.chunksIds.includes(action.chunkId)) {
        return {
          ...monster,
          chunksIds: monster.chunksIds.filter((i) => i !== action.chunkId),
        };
      } else {
        return {
          ...monster,
          chunksIds: [...monster.chunksIds, action.chunkId],
        };
      }
    default:
      action satisfies never;
      return monster;
  }
};

interface IMonsterContext {
  monster: Monster;
  geno: MonsterGeno;
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
  const searchParams = useSearchParams();
  const [monsterGeno, dispatch] = useReducer(monsterReducer, {
    name: searchParams.get("name") || "",
    chunksIds:
      searchParams
        .get("chunkIds")
        ?.split(",")
        .map((n) => parseInt(n)) || [],
  });

  return (
    <MonsterContext.Provider
      value={{
        monster: toFeno(monsterGeno, chunkCatalog),
        geno: monsterGeno,
        dispatch,
      }}
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
