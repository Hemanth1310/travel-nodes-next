import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  let nodes: Awaited<ReturnType<typeof prisma.node.findMany>> = [];
  let hasError = false;

  try {
    nodes = await prisma.node.findMany();
  } catch {
    hasError = true;
  }

  if (hasError) {
    return <main className="w-full pt-5 sm:pl-10 sm:pr-10">Unexpected Error Occured</main>;
  }

  return (
    <main className="w-full flex pt-5 sm:pl-10 sm:pr-10">
      {nodes.map((node) => (
        <div key={node.id} className="border">
          <Image src={node.imageUrl} alt="node" width={320} height={180} />
          <p>{node.title}</p>
        </div>
      ))}
    </main>
  );
}
