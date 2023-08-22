import { chunks } from "@/lib/testing";

const ChunkSelect = () => {
  return (
    <section>
      <form>
        <select>
          {chunks.map((c) => {
            return <option key={c.id}></option>;
          })}
        </select>
      </form>
    </section>
  );
};

export default ChunkSelect;
