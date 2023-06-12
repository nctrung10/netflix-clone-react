import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { MovieType } from '../models/movie';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type PropsType = {
  title: string;
  fetchUrl: string;
  onOpen: (movie: any) => void;
};

const Row = ({ title, fetchUrl, onOpen }: PropsType) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const fetchMovies = async (fetchUrl: string) => {
    try {
      const response = await axios.get(fetchUrl);

      setMovies(response.data.results);
    } catch (error: any) {
      console.log(error);
      // throw new Error(error.message); 
    }
  }

  useEffect(() => {
    fetchMovies(fetchUrl);
  }, [fetchUrl]);

  // For prev & next buttons on the slide
  const slideLeft = () => {
    sliderRef.current!.scrollLeft = sliderRef.current!.scrollLeft - 500;
  };
  const slideRight = () => {
    sliderRef.current!.scrollLeft = sliderRef.current!.scrollLeft + 500;
  };

  return (
    <section>
      <h1 className="text-white font-bold md:text-xl p-4">{title}</h1>
      <div className="relative flex items-center select-none group">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 z-10 bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block invisible sm:visible"
          size={40}
        />
        <div
          ref={sliderRef}
          className="w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {movies.map(item => (
            <Movie key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 z-10 bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block invisible sm:visible"
          size={40}
        />
      </div>
    </section>
  );
};

export default Row;