import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import RMEpisode from "../components/RMEpisode";

export default function Deduped() {
  return (
    <>
      <Character id="1" />
      <Character id="1" />
    </>
  );
}

function Character({ id }) {
  const { status, error, data } = useQuery({
    queryKey: ["characters", id],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
        res.json()
      ),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <>
      <article>
        <Image src={data.image} alt={data.name} width="300" height="300" />
        <h2>{data.name}</h2>
      </article>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.episode.map((episode) => {
                    const episodeUrlParts = episode.split("/").filter(Boolean);
                    const episodeId =
                      episodeUrlParts[episodeUrlParts.length - 1];

                    return <RMEpisode key={episodeId} episodeId={episodeId} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
