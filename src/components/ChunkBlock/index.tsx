import { Chunk } from "@/lib/icrpg";
import Icon from "@/icons/Icon";
const ChunkBlock = ({ chunk }: { chunk: Chunk }) => {
  const hpRepr = chunk.hp > 0 ? `HEARTS +${chunk.hp}` : null;
  const statsReps = Object.entries(chunk.stats).map(
    ([stat, val]) => `${stat} +${val}`,
  );
  const effortReps = Object.entries(chunk.efforts).map(
    ([effort, val]) => `${effort} +${val}`,
  );
  const actionReps = chunk.actions.map((action) => action.name);

  const repr = [hpRepr, ...statsReps, ...effortReps, ...actionReps].filter(
    (v) => v !== null,
  );

  return (
    <div className="font-hand flex h-20 items-center gap-4 rounded-xl border border-b-2 border-white px-4 py-1 text-white">
      <h2 className="text-2xl font-black">{chunk.name}:</h2>
      <div className="flex max-h-full flex-col flex-wrap gap-1 gap-x-4">
        {repr.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </div>
    </div>
  );
};

export default ChunkBlock;
