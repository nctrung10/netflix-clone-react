import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import requests from "../Request";
import { MovieType } from "../models/movie";
import { MdPlayArrow, MdInfoOutline } from "react-icons/md";

const Main = ({ onOpen }: { onOpen: (movie: any) => void }) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  const movieRandomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[movieRandomIndex];

  const fetchMovies = async () => {
    try {
      const response = await axios.get(requests.requestTrending);

      setMovies(response.data.results);
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Detecting if be the mobile device, then show the posters instead of the backdrops
  let imgMovie = movie?.backdrop_path;
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if (isMobile) {
    imgMovie = movie?.poster_path;
  }
  
  // Slicing the movie 'overview' relied on the amount (num) of the given string
  // const truncateString = (str: string, num: number) => {
  //   if (str?.length > num) {
  //     return str.slice(0, num) + '...';
  //   } else {
  //     return str;
  //   }
  // };

  return (
    <div className="w-full h-[680px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[680px] bg-gradient-to-r from-black/60"></div>
        {!loading && (
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${imgMovie}`}
            alt={movie?.title}
          />
        )}
        <div className="absolute w-full top-1/3 px-4 md:px-10 lg:px-16">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 w-full xl:max-w-[60%]"
            style={{ textShadow: '1px 2px 2px #000' }}
          >
            {movie?.title}
          </h1>
          <p
            className="text-sm md:text-base text-slate-100 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] line-clamp-2"
            style={{ textShadow: '1px 2px 2px #000' }}
          >
            {movie?.overview}
          </p>
          <div className="my-5">
            <Link to={`watch/${movie?.id}`} state={movie}>
              <button
                className="bg-white text-black rounded-sm font-bold px-5 py-2"
              >
                <MdPlayArrow className="inline-block mr-2 mb-0.5 scale-[2]" />
                Play
              </button>
            </Link>

            <button
              className="bg-white/30 backdrop-blur rounded-sm font-bold px-5 py-2 ml-4"
              onClick={() => onOpen(movie)}
            >
              <MdInfoOutline className="inline-block mr-2 mb-0.5 scale-150" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;