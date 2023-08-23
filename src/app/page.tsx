import Header from "@/components/Header";
import MonsterEditor from "@/components/MonsterEditor";

import { prisma } from "@/lib/utils/db";
import { dbChunktoClientChunk } from "@/lib/icrpg";
import { MonsterProvider } from "@/context/MonsterContext";

const getChunks = async () => {
  const chunks = await prisma.chunk.findMany({
    include: {
      actions: true,
    },
  });

  console.log(chunks);
  return chunks.map(dbChunktoClientChunk);
};

export default async function Home() {
  const chunks = await getChunks();
  return (
    <>
      <MonsterProvider chunkCatalog={chunks}>
        <main className="mx-auto max-w-3xl overflow-hidden rounded-t-xl border-4 border-white  bg-dark text-white md:mt-8">
          <Header />
          <MonsterEditor chunks={chunks} />
        </main>
      </MonsterProvider>
    </>
  );
}
