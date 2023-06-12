import { useState, useContext, useEffect } from 'react';

import { FaPlus, FaCheck } from 'react-icons/fa';
import { MovieType, SavedMovieType } from '../models/movie';
import { AuthContext } from '../store/auth-context';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

type PropsType = {
  item: MovieType;
  onOpen: (movie: any) => void;
};

const Movie = ({ item, onOpen }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState<SavedMovieType[]>([]);
  const [like, setLike] = useState(false);
  const { user } = useContext(AuthContext);

  const movieRef = doc(db, 'users', `${user?.email}`);

  // console.log(savedMovies);

  // Show movies that is added into the list
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setSavedMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  // Show properly icon after when trigger the save movie handler
  useEffect(() => {
    savedMovies && savedMovies.forEach(movie => {
      if (movie.id === item.id) {
        setLike(prev => !prev);
      }
    });
    // console.log('re-render');
  }, [savedMovies, item.id]);

  // Handling add/remove movie from the list
  const saveMovieHandler = async (movieId: number) => {
    // If 'like' is false (the movie hasn't been added into the list),
    // then add that movie into the list, otherwise remove...
    if (!like) {
      setLoading(true);
      try {
        await updateDoc(movieRef, {
          savedMovies: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path
          })
        });

        setLike(!like);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      setLoading(true);
      setLike(!like);

      try {
        const result = savedMovies.filter(({ id }) => id !== movieId);
        await updateDoc(movieRef, { savedMovies: result });

        savedMovies.forEach(movie => {
          if (movie.id !== item.id) setLike(!like);
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative cursor-pointer p-2">
      <img
        className="w-full h-full"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full text-white hover:bg-black/80 opacity-0 hover:opacity-100">

        <p
          className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
          onClick={() => onOpen(item)}
        >
        
          {item?.title}
        </p>
        <p className="absolute top-4 left-4 text-gray-300" id={item.id.toString()} onClick={() => saveMovieHandler(item.id)}>
          {!loading && (like ? <FaCheck /> : <FaPlus />)}
        </p>
      </div>
    </div>
  );
};

export default Movie;