import Image from "next/image";
import { useState, useEffect } from "react";

export default function Traditional() {
  const [characters, setCharacters] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("loading");

  const fetchCharacters = async () => {
    try {
      setStatus("loading");

      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();
      setCharacters(data);
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
      {characters.results.map((character) => (
        <article key={character.id}>
          <Image
            src={character.image}
            alt={character.name}
            width="300"
            height="300"
          />
          <h2>{character.name}</h2>
        </article>
      ))}
    </>
  );
}
