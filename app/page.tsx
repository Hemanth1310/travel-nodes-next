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
    <main className="w-full grid grid-cols-3 pt-5 sm:pl-10 sm:pr-10">
      {nodes.map((node) => (
        <div key={node.id} className="border flex flex-col items-center p-5">
          <Image className="w-full h-60" src={node.imageUrl} alt="node" width={320} height={180} />
          <p className="text-lg font-bold">{node.title}</p>
          <p className="text-sm font-light">@{node.coordinates}</p>
          <p className="">{node.content}</p>
        </div>
      ))}
      {nodes.map((node) => (
        <div key={node.id} className="border flex flex-col items-center p-5">
          <Image className="w-full h-60" src={node.imageUrl} alt="node" width={320} height={180} />
          <p className="text-lg font-bold">{node.title}</p>
          <p className="text-sm font-light">@{node.coordinates}</p>
          <p className="">{node.content}</p>
        </div>
      ))}
      {nodes.map((node) => (
        <div key={node.id} className="border flex flex-col items-center p-5">
          <Image className="w-full h-60" src={node.imageUrl} alt="node" width={320} height={180} />
          <p className="text-lg font-bold">{node.title}</p>
          <p className="text-sm font-light">@{node.coordinates}</p>
          <p className="">{node.content}</p>
        </div>
      ))}
      {nodes.map((node) => (
        <div key={node.id} className="border flex flex-col items-center p-5">
          <Image className="w-full h-60" src={node.imageUrl} alt="node" width={320} height={180} />
          <p className="text-lg font-bold">{node.title}</p>
          <p className="text-sm font-light">@{node.coordinates}</p>
          <p className="">{node.content}</p>
        </div>
      ))}
     
    </main>
  );
}
