"use client";
import Header from "@/components/Header";
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
    <label htmlFor={htmlFor} className={`font-flat text-red ${className}`}>
      {children}
    </label>
  );
};

const ChunkSummary = ({
  chunk,
  classNames,
}: {
  chunk: Chunk;
  classNames: string;
}) => {
  const hpRepr = chunk.hp > 0 ? `+${chunk.hp} HEARTS` : null;
  const statsReps = Object.entries(chunk.stats).map(
    ([stat, val]) => `+${val} ${stat}`,
  );
  const effortReps = Object.entries(chunk.efforts).map(
    ([effort, val]) => `+${val} ${effort}`,
  );
  const actionReps = chunk.actions.map((action) => action.name);

  const repr = [hpRepr, ...statsReps, ...effortReps, ...actionReps]
    .filter((v) => v !== null)
    .join(", ");
  return <p className={classNames}>{repr}</p>;
};

export default function Home() {
  const { monster, dispatch } = useMonsterContext();
  const [modal, setModal] = useState<boolean>(false);
  return (
    <main className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-t-xl border-4  border-white bg-dark text-white">
      <Header />

      <div className="grid grid-cols-6 gap-4 p-6">
        <section className="col-span-3 flex flex-col">
          <Label htmlFor="name" className="col-span-6">
            Name
          </Label>
          <input
            autoCorrect="off"
            autoComplete="off"
            placeholder="Click me to edit"
            className="bg-transparent font-sans text-lg placeholder:text-inactive "
            type="text"
            id="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "updateName", value: e.target.value })
            }
            value={monster.name}
          />
        </section>
        <section className="col-span-3 flex flex-col">
          <Label htmlFor="hearts">Hearts</Label>
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
        <Label htmlFor="stats" className="col-span-6">
          Stats
        </Label>

        {STATS.map((stat) => (
          <div key={stat} className="col-span-1">
            <StatBlock
              name={stat}
              value={monster.stats[stat] || 0}
              icon={<Icon variant="D20" className="w-5 [&>path]:fill-white" />}
            />
          </div>
        ))}

        <Label htmlFor="effort" className="col-span-6">
          Effort
        </Label>

        {EFFORTS.map(([effort, variant]) => (
          <div className="col-span-1" key={effort}>
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

        <Label htmlFor="actions" className="col-span-6">
          Actions
        </Label>

        {monster.actions.map((action) => (
          <div key={action.name} className="col-span-3">
            <h3 className="font-flat">{action.name}:</h3>
            <p>{action.description}</p>
          </div>
        ))}

        <Label htmlFor="actions" className="col-span-6">
          Chunks
        </Label>
        {monster.chunks.map((chunk, i) => (
          <div
            key={chunk.name}
            className="group relative  col-span-3 overflow-hidden rounded-xl bg-white"
          >
            <div className="flex items-start justify-between rounded-t-xl bg-red p-4">
              <div>
                <h3 className="font-flat">{chunk.name}:</h3>
                <ChunkSummary
                  chunk={chunk}
                  classNames="text-white font-flat text-xs"
                />
              </div>
              <button
                onClick={() => dispatch({ type: "removeChunk", index: i })}
                className="font-flat opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              >
                x
              </button>
            </div>
            <div className="p-4">
              <p className="text-dark">{chunk.description}</p>
            </div>
          </div>
        ))}
        <div
          onClick={() => setModal(true)}
          className="relative col-span-3 grid cursor-pointer place-content-center overflow-hidden rounded-xl bg-red transition-transform duration-100 ease-in-out hover:scale-105"
        >
          <p className="p-2 pl-4 font-flat text-white">+ Add new chunk</p>
        </div>
      </div>
      <div
        id="modal"
        data-shown={modal}
        className="fixed inset-0 hidden h-screen w-screen place-content-center overflow-y-auto bg-dark bg-opacity-70 data-[shown=true]:grid"
        onClick={() => setModal(false)}
      >
        <div
          className="flex flex-col items-center gap-4 rounded-xl border-2 border-white bg-dark p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <h1>Coming soon...</h1>
          <button
            className="rounded-xl bg-white px-4 py-1 text-dark"
            onClick={(event) => {
              event.stopPropagation();
              setModal(false);
            }}
          >
            close
          </button>
        </div>
      </div>
    </main>
  );
}
