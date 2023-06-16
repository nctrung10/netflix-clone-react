import { useState, useEffect } from 'react';

import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../store/auth-context';
import { SavedMovieType } from '../models/movie';
import LoadingSpinner from './UI/LoadingSpinner';
import axios from 'axios';

type PropsType = {
  onOpen: (movie: any) => void;
};

const SavedMovies = ({ onOpen }: PropsType) => {
  const [movies, setMovies] = useState<SavedMovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();

  const movieRef = doc(db, 'users', `${user?.email}`);

  // Fetch saved movies from db
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  // Open Movie Detail
  const openMovieHandler = async (movieId: number) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cf1067f63c54fb71cd96ee9ab5a65975&language=en-US`);
      onOpen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a movie in the saved movies list
  const deleteMovie = async (movieId: number) => {
    setLoading(true);

    try {
      const result = movies.filter(({ id }) => id !== movieId);
      await updateDoc(movieRef, { savedMovies: result });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const renderMovies = (
    <div className="relative flex items-center select-none">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {movies?.length > 0 && movies.map(item => (
          <div key={item.id} className="relative cursor-pointer">
            <img
              className="w-full h-auto text-white"
              src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
              alt={item?.title}
            />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
              <p
                className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                onClick={() => openMovieHandler(item.id)}
              >
                {item?.title}
              </p>
              <p onClick={() => deleteMovie(item.id)} className="text-gray-300 absolute top-4 right-4">
                <AiOutlineClose className="scale-125" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section>
      <h1 className="text-white font-bold text-lg md:text-xl px-4 py-6">My List</h1>
      {loading ? <LoadingSpinner /> : renderMovies}
    </section>
  );
};

export default SavedMovies;