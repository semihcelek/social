import React from "react";
import Story from "../components/Story";
import { useFetch } from "../services/useFetch";

const StoriesPage = () => {
  const { data, isloading, error } = useFetch("/post/all/json");

  return (
    <div>
      {isloading ? (
        <div>load...</div>
      ) : (
        data.map((story) => (
          <div key={story.id}>
            <Story
              title={story.title}
              content={story.content}
              author={story.author}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default StoriesPage;
