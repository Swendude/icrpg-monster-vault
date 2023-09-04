"use client";

import ChunkBlock from "@/components/ChunkBlock";
import StatBlock from "@/components/StatBlock";
import { useMonsterContext } from "@/context/MonsterContext";
import Icon from "@/icons/Icon";
import { Chunk, EFFORTS, Monster, STATS } from "@/lib/icrpg";
import { ReactNode, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "@/components/ui/input";
import ChunkSelect from "../ChunkSelect";
import { cn } from "@/lib/utils";

const Label = ({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor: string;
  className?: String;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-hand text-4xl text-red ${className} flex flex-col text-center md:text-left`}
    >
      {children}
    </label>
  );
};

const MonsterEditor = ({ chunks }: { chunks: Chunk[] }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const { monster, dispatch } = useMonsterContext();
  return (
    <>
      <div className="grid grid-cols-6 items-center gap-2 p-6">
        <Label htmlFor="name" className="col-span-full md:col-span-1">
          Name
        </Label>
        <section className="md:justify-1 col-span-2 flex">
          <Input
            autoCorrect="off"
            autoComplete="off"
            placeholder="Click me to edit"
            className="border-none bg-transparent p-0 font-hand text-2xl"
            type="text"
            id="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "updateName", value: e.currentTarget.value });
            }}
            value={monster.name}
          />
        </section>
        <Label htmlFor="hearts">Hearts</Label>
        <section className="col-span-2 flex flex-col text-center md:text-left">
          <div className="flex">
            {monster.hp ? (
              [...new Array(monster.hp)].map((i) => (
                <Icon
                  variant="Heart"
                  key={i}
                  className="
              w-10 
              [&>path]:fill-red
              "
                />
              ))
            ) : (
              <p className="col-span-2 text-2xl text-inactive">
                No chunks added
              </p>
            )}
          </div>
        </section>
        <Label htmlFor="stats" className="col-span-full">
          Stats
        </Label>

        {STATS.map((stat) => (
          <div key={stat} className="">
            <StatBlock
              name={stat}
              value={monster.stats[stat] || 0}
              icon={<Icon variant="D20" className="w-5 [&>path]:fill-white" />}
            />
          </div>
        ))}

        <Label htmlFor="effort" className="col-span-full">
          Effort
        </Label>

        {EFFORTS.map(([effort, variant]) => (
          <div className="" key={effort}>
            <StatBlock
              key={effort}
              name={effort}
              value={monster.efforts[effort] || 0}
              icon={
                <Icon variant={variant} className="w-5 [&>path]:fill-white" />
              }
            />
          </div>
        ))}

        {/* <Label htmlFor="actions" className="col-span-full">
          Actions & Traits
        </Label>

        {monster.actions.length > 0 ? (
          monster.actions.map((action) => (
            <div key={action.name} className="col-span-3">
              <h3 className="font-hand text-2xl font-bold">{action.name}:</h3>
              <p className="font-hand text-xl">{action.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-2xl text-inactive">No chunks added</p>
        )} */}

        <Label htmlFor="chunks" className="col-span-full">
          Chunks
        </Label>

        {monster.chunks.length > 0 ? (
          monster.chunks.map((chunk, i) => (
            <div key={chunk.name} className="col-span-3 self-start">
              <ChunkBlock chunk={chunk} />
            </div>
          ))
        ) : (
          <p className="col-span-2 text-2xl text-inactive">No chunks added</p>
        )}
        <div className="col-span-full border-t-2 border-dashed border-t-white" />
        <Modal className="col-span-2" text="Manage Chunks">
          <ChunkSelect chunks={chunks} />
        </Modal>
        <Modal className="col-span-2" text="Create Chunk">
          Create
        </Modal>
      </div>
    </>
  );
};

export default MonsterEditor;
