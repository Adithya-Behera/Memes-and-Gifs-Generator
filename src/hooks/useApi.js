// import trending from '../dummy/trending.json'
import memes from '../dummy/list.json'
import axios from "axios";

const createUrl = import.meta.env.VITE_APP_CREATEMEME_URL;
const headerKey = import.meta.env.VITE_APP_HEADER_KEY;
const headerHost = import.meta.env.VITE_APP_HEADER_HOST2;
export const useApi = () => {
  const getTrending = async ()=> {
    // const baseUrl = window.location.origin;
    // const result = await axios.get(`${baseUrl}/.netlify/functions/reddit-memes`)
    // return result.data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(trending)
      }, 2000)
    })
  }

  const getMemes = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = memes.map(meme => {
          return {
            name: meme,
            image: `/img/${meme}.jpeg`
          }
        })
        resolve(result)
      }, 20)
    })
  }

  const createMeme = async (top, bottom, meme) => {
    // return new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //    const result = await fetch('/img/10-Guy.jpeg')
    //    const blog = await result.blob()
    //    const objectURL = URL.createObjectURL(blog)
    //    resolve(objectURL)
    //   }, 20)
    // })

    const result = await axios.get(createUrl, {
      params: {
        top,
        bottom,
        meme,
      },
      headers: {
        'X-RapidAPI-Key': headerKey,
        'X-RapidAPI-Host': headerHost
      },
      responseType: 'blob'
    })
    console.log('after call: ', result);

    return URL.createObjectURL(result.data)
  }

  return {
    getTrending,
    getMemes,
    createMeme
  }
}