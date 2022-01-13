import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import RMEpisode from "../../components/RMEpisode";

export default function Character() {
  const router = useRouter();
  const { status, error, data } = useQuery(
    ["characters", router.query.id],
    () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${router.query.id}`
      ).then((res) => res.json())
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <>
      <article>
        <Image src={data.image} alt={data.name} width="300" height="300" />
        <h2>{data.name}</h2>
      </article>
      {data.episode.map((episode) => {
        const episodeUrlParts = episode.split("/").filter(Boolean);
        const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

        return <RMEpisode key={episodeId} episodeId={episodeId} />;
      })}
    </>
  );
}
