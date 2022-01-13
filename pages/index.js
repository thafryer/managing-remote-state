import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Home() {
  const { status, error, data } = useQuery("characters", () =>
    fetch("https://rickandmortyapi.com/api/character/").then((res) =>
      res.json()
    )
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {data.results.map((character) => (
        <article
          key={character.id}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              width="150"
              height="150"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-gray-900">
              {character.name}
            </h2>
            <Link
              href={`/characters/${character.id}`}
              className="text-sm text-gray-500"
            >
              View
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
