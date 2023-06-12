import { useState, useEffect, useContext } from 'react';

import axios from "axios";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { FaCheck, FaPlus } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import { MovieType, SavedMovieType } from '../models/movie';
import Modal from "./UI/Modal";
import { AuthContext } from '../store/auth-context';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

type PropsType = {
  movie?: MovieType;
  onClose: () => void;
};

const MovieDetail = ({ movie, onClose }: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [videoKeys, setVideoKeys] = useState<any>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [cast, setCast] = useState<string[]>([]);
  const [runtime, setRuntime] = useState(0);
  const [genres, setGenres] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [moviesInList, setMoviesInList] = useState<SavedMovieType[]>([]);
  const [like, setLike] = useState(false);
  const { user } = useContext(AuthContext);

  // Only use the (last) trailer video of movie
  const trailerVideos: any = [];
  videoKeys?.forEach((item: any) => {
    if (item?.type === 'Trailer') trailerVideos.push(item);
  });
  const lastVideo = trailerVideos[trailerVideos.length - 1];
  const lastVideoKey = lastVideo?.key;

  useEffect(() => {
    const urls = [
      `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=cf1067f63c54fb71cd96ee9ab5a65975&append_to_response=videos&language=en-US`,
      `https://api.themoviedb.org/3/movie/${movie?.id}/credits?api_key=cf1067f63c54fb71cd96ee9ab5a65975&language=en-US`,
      `https://api.themoviedb.org/3/movie/${movie?.id}?api_key=cf1067f63c54fb71cd96ee9ab5a65975&append_to_response=videos,credits&language=en-US`
    ];

    const fetchInsights = async () => {
      try {
        const requests = urls.map(url => axios.get(url));
        await axios.all(requests)
          .then(axios.spread((videos, credits, details) => {
            setVideoKeys(videos.data.results);

            const crewResults = credits.data.crew.filter(({ job }: any) => job === 'Director');
            crewResults.map(({ name }: any) => setDirectors(prev => [...prev, name]));

            const castResults = credits.data.cast;
            castResults.map(({ name }: any) => setCast(prev => [...prev, name]));

            setRuntime(details.data?.runtime);
            setGenres(details.data.genres);
          }));


      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchInsights();
  }, [movie?.id]);


  // Show movies that is added into the list
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMoviesInList(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  useEffect(() => {
    if (moviesInList) {
      moviesInList.forEach(item => {
        if (item.id === movie?.id) setLike(true);
      });
    }
  }, [moviesInList, movie?.id]);

  // Handling add/remove movie from the list
  const movieRef = doc(db, 'users', `${user?.email}`);

  const saveMovieHandler = async (movieId: number) => {
    if (!like) {
      setLike(true);

      try {
        await updateDoc(movieRef, {
          savedMovies: arrayUnion({
            id: movie?.id,
            title: movie?.title,
            img: movie?.backdrop_path
          })
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setLike(false);

      try {
        const result = moviesInList.filter(({ id }) => id !== movieId);
        await updateDoc(movieRef, {
          savedMovies: result
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const infoMovie = (
    <>
      <h1 className="text-lg sm:text-xl mb-2 font-bold">{movie?.title}</h1>
      <div>
        {movie!.release_date.slice(0, 7) >= '2023-04' && <span className="mr-2 text-green-600">New</span>}
        <span>{movie?.release_date}</span>
        {movie?.adult
          ? <span className="ml-2 p-1 text-[11px] bg-white/20 rounded-sm">18+</span>
          : <span className="ml-2 p-1 text-[11px] bg-white/20 rounded-sm">16+</span>
        }
        <span className="ml-2">{runtime > 0 && `${Math.floor(runtime / 60)}h${runtime % 60}m`}</span>
        {genres.map(item => (
          <span key={item.id} className="ml-2 text-xs text-white/50 pr-2 border-r last:border-none">{item.name}</span>
        ))}
      </div>
      {movie!.vote_average > 8 && (
        <div className="flex items-center mt-2">
          <div className='p-1 bg-red-600 rounded-sm'>
            <AiFillLike className="scale-110" />
          </div>
          <p className="font-bold ml-2">Most Liked</p>
        </div>
      )}
    </>
  );

  return (
    <Modal onClick={onClose}>
      <div className="w-full h-[300px] lg:h-[360px] relative rounded-tr-md rounded-tl-md">
        <div className="w-full h-full">
          {!loading && (
            lastVideoKey ? (
              <iframe
                className='w-full h-full rounded-tl-md rounded-tr-md'
                src={`https://www.youtube-nocookie.com/embed/${lastVideoKey}?playlist=${lastVideoKey}&loop=1&autoplay=1&controls=1&mute=1`}
                title={lastVideoKey}
                allow='autoplay; encrypted-media'
              ></iframe>
            ) : (
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path ? movie.backdrop_path : movie?.poster_path}`}
                alt={movie?.title}
              />
            )
          )}
        </div>
        <div
          className="absolute top-4 right-4 z-[105] cursor-pointer rounded-full p-3 bg-[#252525]"
          onClick={onClose}
        >
          <AiOutlineClose className="scale-125" />
        </div>
        <div className="absolute w-auto bottom-12 px-8 hidden lg:block">
          <div className="mt-5 text-sm">
            <Link to={`watch/${movie?.id}`} state={movie} onClick={onClose}>
              <button className="bg-white text-black rounded-sm font-bold px-5 py-2">
                <MdPlayArrow className="inline-block mr-2 mb-1 scale-[2]" />
                Play
              </button>
            </Link>
            {!loading && (
              <button className="ml-6 font-bold" onClick={() => saveMovieHandler(movie!.id)}>
                {like
                  ? <FaCheck className="inline-block mb-1 scale-150 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.4)]" />
                  : <FaPlus className="inline-block mb-1 scale-150 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.4)]" />
                }
                <span className="ml-2" style={{ textShadow: '1px 2px 2px #000' }}>My List</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 w-full h-[400px] lg:h-[260px] overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="mb-5 text-white/95 text-sm">
          {!loading && infoMovie}
        </div>

        <div className="block lg:hidden">
          <Link to={`watch/${movie?.id}`} state={movie} onClick={onClose}>
            <button className="w-full bg-white text-black rounded-sm font-bold py-2">
              <MdPlayArrow className="inline-block mr-2 mb-1 scale-[2]" />
              Play
            </button>
          </Link>
          <div className="mt-6 mb-5">
            {!loading && (
              <button className="flex flex-col items-center justify-center" onClick={() => saveMovieHandler(movie!.id)}>
                {like
                  ? <FaCheck className="inline-block text-2xl" />
                  : <FaPlus className="inline-block text-2xl" />
                }
                <span className="text-sm text-white/70 select-none mt-1">My List</span>
              </button>
            )}
          </div>
        </div>
        <div className="text-sm text-white/50">
          <p className="lg:text-base mb-2 text-white">{movie?.overview}</p>
          <div className="mb-1">
            <p className={`${showMore ? '' : 'line-clamp-1'}`}>
              Cast:
              {!loading && cast.map((person, index) => (
                <span
                  key={index}
                  className="ml-1 after:content-[','] last:after:hidden"
                >
                  {person}
                </span>
              ))}
            </p>
            <button className="font-bold" onClick={() => setShowMore(!showMore)}>{showMore ? 'show less' : 'show more'}</button>
          </div>
          <p>
            Director:
            {!loading && directors.map(person => (
              <span
                key={person}
                className="ml-1 after:content-[','] last:after:hidden"
              >
                {person}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetail;