import { useMonsterContext } from "@/context/MonsterContext";
import { Chunk } from "@/lib/icrpg";
import ChunkBlock from "../ChunkBlock";

const ChunkSelect = ({ chunks }: { chunks: Chunk[] }) => {
  const { monster } = useMonsterContext();
  return (
    <form className="min-w-max">
      {chunks.map((c) => (
        <ChunkBlock key={c.id} chunk={c} />
      ))}
    </form>
  );
};

export default ChunkSelect;
