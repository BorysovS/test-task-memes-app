import { useState, useEffect } from "react";
import { Card, Image } from "@heroui/react";

import { getAllMemes } from "@/api-services";

export const MemesList = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const data = await getAllMemes();

        if (Array.isArray(data)) {
          const validMemes = data.filter(
            (meme) =>
              meme &&
              typeof meme === "object" &&
              "id" in meme &&
              "name" in meme &&
              "likes" in meme
          );

          setMemes(validMemes);
        } else {
          setError("Invalid data format received from API.");
        }
      } catch (err) {
        setError("Failed to load memes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!memes.length) {
    return <div className="p-4 text-gray-600">No memes available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {memes.map((meme) => (
        <Card
          key={meme.id}
          title={meme.name}
          className="border rounded shadow hover:shadow-lg transition justify-center items-center"
        >
          <Image
            src={meme.image}
            alt={meme.name}
            className="w-full h-48 object-contain rounded-t"
          />
          <div className="p-4">
            <p className="text-gray-600">Likes: {meme.likes}</p>
            <a
              href={meme.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Image
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};
