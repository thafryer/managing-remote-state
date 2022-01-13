import Image from "next/image";
import { useState, useEffect } from "react";
import RMEpisode from "../../components/RMEpisode";

export default function NotDeduped() {
  return (
    <>
      <TraditionalCharacter id="1" />
      <TraditionalCharacter id="2" />
    </>
  );
}

function TraditionalCharacter({ id }) {
  const [character, setCharacter] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("loading");

  const fetchCharacters = async () => {
    try {
      setStatus("loading");

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setCharacter(data);
      setError();
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <>
      <article>
        <Image
          src={character.image}
          alt={character.name}
          width="300"
          height="300"
        />
        <h2>{character.name}</h2>
      </article>
      {character.episode.map((episode) => {
        const episodeUrlParts = episode.split("/").filter(Boolean);
        const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

        return <RMEpisode key={episodeId} episodeId={episodeId} />;
      })}
    </>
  );
}
