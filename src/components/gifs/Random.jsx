import React from "react";
import Spinner from './Spinner'
import useGif from "../../hooks/useGif";
import DownloadButton from "./DownloadButton";
const Random = () => {
    const { gif, loading, fetchData } = useGif();
  return (
    <div className="w-[500px] sm:max-w-full flex-shrink bg-green-500 rounded-lg items-center flex flex-col border border-black mb-5">
      <div className="text-2xl underline font-bold uppercase">A Random Gif</div>
      <div className="max-w-72 max-h-96 overflow-hidden">
        {!loading?(<img
          src={gif}
          alt="Random Gif"
          className="object-contain w-full m-2 h-full"
        />):(<Spinner />)}
      </div>
      <div className="w-full mt-auto pt-2 flex justify-center">
      <button
        onClick={()=>fetchData()}
        className="w-10/12 p-2 mt-auto mb-1 bg-yellow-100 uppercase rounded-md opacity-85 "
      >
        Generate Random Gif
      </button>
      <DownloadButton url={gif}/>
      </div>
    </div>
  );
};

export default Random;
