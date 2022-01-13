import { useQuery } from "react-query";

export default function RMEpisode({ episodeId }) {
  const { data, status, error } = useQuery(["episodes", episodeId], () =>
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`).then((res) =>
      res.json()
    )
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {data.name}
      </td>
    </tr>
  );
}
