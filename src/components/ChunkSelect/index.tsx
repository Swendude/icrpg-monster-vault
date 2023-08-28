import { useMonsterContext } from "@/context/MonsterContext";
import { Chunk } from "@/lib/icrpg";
import ChunkBlock from "../ChunkBlock";

const ChunkSelect = ({ chunks }: { chunks: Chunk[] }) => {
  const { monster, geno, dispatch } = useMonsterContext();
  return (
    <form className="">
      {chunks.map((c) => (
        <div key={c.id} className="mb-4 grid grid-cols-[1fr_7fr] items-center">
          <input
            className="aspect-square h-8 accent-red"
            type="checkbox"
            name="chunckId"
            id={`chunkId-${c.id}`}
            checked={geno.chunksIds.includes(c.id)}
            onChange={() => dispatch({ type: "toggleChunk", chunkId: c.id })}
          />
          <ChunkBlock chunk={c} />
        </div>
      ))}
    </form>
  );
};

export default ChunkSelect;
