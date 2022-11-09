import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RMEpisode from "../../components/RMEpisode";

export default function Character() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { status, error, data } = useQuery({
    queryKey: ["characters", router.query.id],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${router.query.id}`
      ).then((res) => res.json()),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <>
      <article>
        <Image src={data.image} alt={data.name} width="300" height="300" />
        <h2>{data.name}</h2>
      </article>
      <button onClick={() => queryClient.invalidateQueries(["episodes", 25])}>
        Invalidate Button
      </button>
      {data.episode.map((episode) => {
        const episodeUrlParts = episode.split("/").filter(Boolean);
        const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

        return <RMEpisode key={episodeId} episodeId={episodeId} />;
      })}
    </>
  );
}
