"use client";
import Header from "@/components/Header";
import StatBlock from "@/components/StatBlock";
import { MonsterContext, useMonsterContext } from "@/context/MonsterContext";
import Icon from "@/icons/Icon";
import { EFFORTS, Monster, STATS } from "@/types/icrpg";
import { ReactNode, useState } from "react";

const Label = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) => {
  return (
    <label htmlFor={htmlFor} className="font-flat text-red">
      {children}
    </label>
  );
};

export default function Home() {
  const { monster, dispatch } = useMonsterContext();

  return (
    <main className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-t-xl border-4  border-white bg-dark text-white">
      <Header />
      <section className=" p-4">
        <form className="grid grid-cols-6 gap-4">
          <section className="col-span-3 flex flex-col">
            <Label htmlFor="name">Name</Label>
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
              <input
                className="hidden"
                type="radio"
                name="hearts"
                id="hearts"
                value={monster.hp}
                checked
                readOnly
              />
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
                  aria-controls="hearts"
                  onClick={() => dispatch({ type: "updateHearts", value: i })}
                />
              ))}
            </div>
          </section>
          <section className="col-span-6 flex flex-col">
            <Label htmlFor="stats">Stats</Label>
            <div className="flex gap-2 ">
              {STATS.map((stat) => (
                <StatBlock
                  key={stat}
                  name={stat}
                  value={monster.stats[stat] || 0}
                  icon={
                    <Icon variant="D20" className="w-5 [&>path]:fill-white" />
                  }
                />
              ))}
            </div>
          </section>
          <section className="col-span-6 flex flex-col">
            <Label htmlFor="effort">Effort</Label>
            <div className="flex gap-2 ">
              {EFFORTS.map(([stat, variant]) => (
                <StatBlock
                  key={stat}
                  name={stat}
                  value={monster.efforts[stat] || 0}
                  icon={
                    <Icon
                      variant={variant}
                      className="w-5 [&>path]:fill-white"
                    />
                  }
                />
              ))}
            </div>
          </section>
          <section className="col-span-6 flex flex-col">
            <Label htmlFor="actions">Actions</Label>
            {monster.actions.map((action) => (
              <div key={action.name} className="mb-4">
                <h3 className="text-md font-flat">{action.name}:</h3>
                {/* <div className="  h-6 w-6 rounded-full border-4 border-white bg-red" /> */}
                <p>{action.description}</p>
              </div>
            ))}
          </section>
        </form>
      </section>
    </main>
  );
}
