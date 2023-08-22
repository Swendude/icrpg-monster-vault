import { Chunk } from "@/lib/icrpg";
import Icon from "@/icons/Icon";
const ChunkBlock = ({
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

export default ChunkBlock;
