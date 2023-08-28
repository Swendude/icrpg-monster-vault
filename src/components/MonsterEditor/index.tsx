"use client";

import ChunkBlock from "@/components/ChunkBlock";
import ChunkSelect from "@/components/ChunkSelect";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import StatBlock from "@/components/StatBlock";
import { MonsterContext, useMonsterContext } from "@/context/MonsterContext";
import Icon from "@/icons/Icon";
import { Chunk, EFFORTS, Monster, STATS } from "@/lib/icrpg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

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
      className={`font-hand text-4xl text-red ${className} col-span-full flex flex-col text-center md:text-left`}
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
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-6">
        <Label htmlFor="name">Name</Label>
        <section className="col-span-full flex justify-center md:justify-normal">
          <input
            autoCorrect="off"
            autoComplete="off"
            placeholder="Click me to edit"
            className="bg-transparent text-center font-hand text-2xl placeholder:text-inactive md:text-left"
            type="text"
            id="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "updateName", value: e.currentTarget.value });
            }}
            value={monster.name}
          />
        </section>
        <Label htmlFor="hearts">Hearts</Label>
        <section className="col-span-full flex flex-col text-center md:col-span-3 md:text-left">
          <div className="flex">
            {[...new Array(monster.hp)].map((i) => (
              <Icon
                variant="Heart"
                key={i}
                className="
              w-10 
              [&>path]:fill-red
              "
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
              icon={<Icon variant="D20" className="w-5 [&>path]:fill-white" />}
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

        <Label htmlFor="actions">Actions & Traits</Label>

        {monster.actions.map((action) => (
          <div key={action.name} className="col-span-full md:col-span-3">
            <h3 className="font-hand text-2xl font-bold">{action.name}:</h3>
            <p className="font-hand text-xl">{action.description}</p>
          </div>
        ))}

        <Label htmlFor="chunks">Chunks</Label>
        {monster.chunks.map((chunk, i) => (
          <div key={chunk.name} className="group relative col-span-full">
            <ChunkBlock chunk={chunk} />
          </div>
        ))}
        <div
          onClick={() => setModal(true)}
          className="relative col-span-6 grid cursor-pointer place-content-center overflow-hidden rounded-xl bg-red transition-transform duration-100 ease-in-out hover:scale-105 md:col-span-3"
        >
          <p className="p-2 pl-4 font-flat text-white">Manage chunks</p>
        </div>
      </div>

      <Modal toggle={() => setModal(!modal)} shown={modal}>
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-white bg-dark p-8">
          <ChunkSelect chunks={chunks} />
        </div>
      </Modal>
    </>
  );
};

export default MonsterEditor;
