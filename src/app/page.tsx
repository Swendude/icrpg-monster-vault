"use client";
import ChunkSelect from "@/components/ChunkSelect";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import StatBlock from "@/components/StatBlock";
import { MonsterContext, useMonsterContext } from "@/context/MonsterContext";
import Icon from "@/icons/Icon";
import { Chunk, EFFORTS, Monster, STATS } from "@/types/icrpg";
import { ClassType, ReactNode, useState } from "react";

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
      className={`font-flat  text-3xl text-red ${className} col-span-full flex flex-col text-center md:text-left`}
    >
      {children}
    </label>
  );
};

const ChunkSummary = ({
  chunk,
  onDelete,
}: {
  chunk: Chunk;
  onDelete: () => void;
}) => {
  const hpRepr = chunk.hp > 0 ? `+${chunk.hp} HEARTS` : null;
  const statsReps = Object.entries(chunk.stats).map(
    ([stat, val]) => `+${val} ${stat}`,
  );
  const effortReps = Object.entries(chunk.efforts).map(
    ([effort, val]) => `+${val} ${effort}`,
  );
  const actionReps = chunk.actions.map((action) => action.name);

  const repr = [hpRepr, ...statsReps, ...effortReps, ...actionReps].filter(
    (v) => v !== null,
  );

  return (
    <div className="">
      <div className="flex justify-between rounded-t-xl border-b-2 border-dashed border-white bg-red p-2 pt-2 font-flat text-white">
        <h2 className="">{chunk.name}:</h2>
        <button
          onClick={onDelete}
          className="aspect-square h-8 rounded-full border-2 bg-white text-xs text-red hover:bg-red"
        >
          🗙
        </button>
      </div>

      <ul className="grid grid-cols-2 border-2 border-t-0 border-white bg-white p-2">
        {repr.map((r) => (
          <li
            className="mb-1 flex w-fit items-center text-sm font-bold text-dark"
            key={r}
          >
            <Icon
              variant="Dot"
              className="mr-2 inline-block h-2 [&>path]:fill-dark"
            />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const { monster, dispatch } = useMonsterContext();
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <main className="mx-auto max-w-3xl overflow-hidden rounded-t-xl border-4 border-white  bg-dark text-white md:mt-8">
        <Header />

        <div className="grid grid-cols-6 gap-4 p-6">
          <Label htmlFor="name">Name</Label>
          <section className="col-span-full flex justify-center">
            <input
              autoCorrect="off"
              autoComplete="off"
              placeholder="Click me to edit"
              className="bg-transparent text-center font-sans text-lg placeholder:text-inactive"
              type="text"
              id="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "updateName", value: e.target.value })
              }
              value={monster.name}
            />
          </section>
          <Label htmlFor="hearts">Hearts</Label>
          <section className="col-span-full flex flex-col text-center md:col-span-3 md:text-left">
            <div className="flex">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <Icon
                  variant="Heart"
                  key={i}
                  data-status={i <= monster.hp ? "filled" : "empty"}
                  className="
                    w-8 
                    [&>path]:fill-none
                    [&>path]:stroke-inactive 
                    [&>path]:stroke-[4]
                    [&>path]:data-[status=filled]:fill-red
                    [&>path]:data-[status=filled]:stroke-white"
                />
              ))}
            </div>
          </section>
          <Label htmlFor="stats">Stats</Label>

          {STATS.map((stat) => (
            <div key={stat} className=" col-span-3 md:col-span-1">
              <StatBlock
                name={stat}
                value={monster.stats[stat] || 0}
                icon={
                  <Icon variant="D20" className="w-5 [&>path]:fill-white" />
                }
              />
            </div>
          ))}

          <Label htmlFor="effort">Effort</Label>

          {EFFORTS.map(([effort, variant]) => (
            <div className="col-span-3 md:col-span-1" key={effort}>
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

          <Label htmlFor="actions">Actions</Label>

          {monster.actions.map((action) => (
            <div key={action.name} className="col-span-full md:col-span-3">
              <h3 className="font-flat">{action.name}:</h3>
              <p>{action.description}</p>
            </div>
          ))}

          <Label htmlFor="chunks">Chunks</Label>
          {monster.chunks.map((chunk, i) => (
            <div
              key={chunk.name}
              className="group relative col-span-full md:col-span-3"
            >
              <ChunkSummary
                chunk={chunk}
                onDelete={() => {
                  const confirmation = confirm(
                    `Are you sure you want to delete the chunk "${chunk.name}" from this monster?`,
                  );
                  if (confirmation) {
                    dispatch({ type: "removeChunk", chunkId: chunk.id });
                  }
                }}
              />
            </div>
          ))}
          <div
            onClick={() => setModal(true)}
            className="relative col-span-6 grid cursor-pointer place-content-center overflow-hidden rounded-xl bg-red transition-transform duration-100 ease-in-out hover:scale-105 md:col-span-3"
          >
            <p className="p-2 pl-4 font-flat text-white">+ Add new chunk</p>
          </div>
        </div>
      </main>
      <Modal toggle={() => setModal(!modal)} shown={modal}>
        <div
          className="flex flex-col items-center gap-4 rounded-xl border-2 border-white bg-dark p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <ChunkSelect />
        </div>
      </Modal>
    </>
  );
}
