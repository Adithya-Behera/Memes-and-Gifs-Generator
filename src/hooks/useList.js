import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const trending = import.meta.env.VITE_APP_LIST_URL;
const headerKey = import.meta.env.VITE_APP_HEADER_KEY;
const headerHost = import.meta.env.VITE_APP_HEADER_HOST2;

const useList = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getNames() {
    setLoading(true);
    try {
      const result= await axios.get(trending,{
          headers: {
          'x-rapidapi-key':headerKey,
          'x-rapidapi-host':headerHost
          }
      });
      setOptions(result.data||[]);
    //   console.log('hello',result.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNames();
  }, []);

  return { options, loading, getNames };
};

export default useList;
