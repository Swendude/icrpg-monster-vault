import { Chunk } from "@/lib/icrpg";
import Icon from "@/icons/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Arrow } from "@radix-ui/react-tooltip";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "../ui/hover-card";
import { cn } from "@/lib/utils";

const ChunkBlock = ({
  chunk,
  className,
}: {
  chunk: Chunk;
  className?: string;
}) => {
  const hpRepr = chunk.hp > 0 ? `HEARTS +${chunk.hp}` : null;
  const statsReps = Object.entries(chunk.stats).map(([stat, val]) => (
    <span key={stat}>
      {stat} {`${val < 0 ? "-" : "+"}${Math.abs(val)}`}
    </span>
  ));
  const effortReps = Object.entries(chunk.efforts).map(([effort, val]) => (
    <span key={effort}>
      {effort} {`${val < 0 ? "-" : "+"}${Math.abs(val)}`}
    </span>
  ));
  const actionReps = chunk.actions.map((action) => (
    <div key={action.name} className="group relative inline-flex">
      <HoverCard>
        <HoverCardTrigger>
          <p>{action.name}</p>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>{action.description}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ));

  const repr = [hpRepr, ...statsReps, ...effortReps, ...actionReps].filter(
    (v) => v !== null,
  );

  return (
    <div
      className={cn(
        "overflow-hidden font-hand leading-normal text-white",
        className,
      )}
    >
      <div className="flex items-center gap-2 ">
        <h2 className="w-fit border-b-2  border-red  text-2xl leading-none">
          {chunk.name}
        </h2>
        <p className="text-dark">
          {[...new Array(chunk.hp)].map((i) => (
            <Icon
              variant="Heart"
              key={i}
              className="
              w-4 
              [&>path]:fill-red
              "
            />
          ))}
        </p>
      </div>
      <p className="space-x-1 text-xs font-bold  [&>*:not(:last-child)]:after:content-[',']">
        {statsReps}
        {effortReps}
      </p>

      {chunk.actions.map((action) => {
        return (
          <div key={action.name} className="">
            <h3 className="text-md pl-4 font-bold">- {action.name}</h3>
            <p className="pl-8">{action.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChunkBlock;
