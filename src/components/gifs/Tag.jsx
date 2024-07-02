import React from "react";
import { useState } from "react";
import Spinner from "./Spinner";
import useGif from "../../hooks/useGif";
import DownloadButton from "./DownloadButton";

const Tag = () => {
  const [tag, setTag] = useState("");
  const { gif, loading, fetchData } = useGif(tag);
  return (
    <div className="w-[500px] sm:max-w-full flex-shrink  bg-blue-500 rounded-lg items-center flex flex-col border border-black mb-5">
      <div className="text-2xl underline font-bold uppercase">A {tag} Gif</div>
      <div className="max-w-72 max-h-96 overflow-hidden">
        {!loading ? (
          <img
            src={gif}
            alt="Gif"
            className="object-contain w-full m-2 h-full"
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="mt-auto flex flex-col w-full items-center">
        <input
          placeholder="Enter a tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData(tag);
            }
          }}
          className="w-9/12 mt-2 p-1 bg-white-100 mb-1 rounded-md text-center "
        ></input>
        <div className="w-full flex justify-center">
          <button
            onClick={() => fetchData(tag)}
            className="w-10/12 p-2 mb-1 bg-yellow-100 uppercase rounded-md opacity-85 "
          >
            Generate Gif
          </button>
          <DownloadButton url={gif} />
        </div>
      </div>
    </div>
  );
};

export default Tag;
