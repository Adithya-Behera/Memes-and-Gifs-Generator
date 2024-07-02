import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const trending = import.meta.env.VITE_APP_TRENDING_URL;
const headerKey = import.meta.env.VITE_APP_HEADER_KEY;
const headerHost = import.meta.env.VITE_APP_HEADER_HOST1;

const useTrending = () => {
  const [memes, setMeme] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTrending() {
    setLoading(true);
    try {
      const result= await axios.get(trending,{
          headers: {
          'x-rapidapi-key':headerKey,
          'x-rapidapi-host':headerHost
          }
      });
      setMeme(result.data||[]);
      console.log('heloo',result.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrending();
  }, []);

  return { memes, loading, getTrending };
};

export default useTrending;
