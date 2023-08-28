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

const ChunkBlock = ({ chunk }: { chunk: Chunk }) => {
  const hpRepr = chunk.hp > 0 ? `HEARTS +${chunk.hp}` : null;
  const statsReps = Object.entries(chunk.stats).map(([stat, val]) => (
    <p key={stat}>
      {stat} {`${val < 0 ? "-" : "+"}${Math.abs(val)}`}
    </p>
  ));
  const effortReps = Object.entries(chunk.efforts).map(([effort, val]) => (
    <p key={effort}>
      {effort} {`${val < 0 ? "-" : "+"}${Math.abs(val)}`}
    </p>
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
    <div className="rounded-xl border-2 border-white px-4 py-1 font-hand text-white">
      <h2 className="text-2xl font-black">{chunk.name}:</h2>
      <div className="flex flex-wrap gap-1 first:text-red [&>*:not(:last-child)]:after:content-[',']">
        {statsReps}
        {effortReps}
        {actionReps}
      </div>
    </div>
  );
};

export default ChunkBlock;
