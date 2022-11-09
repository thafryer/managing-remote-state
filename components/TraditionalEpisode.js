import { useState, useEffect } from "react";
export default function TraditionalEpisode({ episodeId }) {
  const [episode, setEpisode] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("loading");

  const fetchEpisode = async () => {
    try {
      setStatus("loading");

      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );
      const data = await response.json();
      setEpisode(data);
      setError();
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;
  return (
    <div>
      <h3>{episode.name}</h3>
    </div>
  );
}
