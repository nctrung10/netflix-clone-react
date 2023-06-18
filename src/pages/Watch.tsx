import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from 'axios';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const WatchPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { state: movie } = useLocation();
  const navigate = useNavigate();

  const randomVideoIndex = Math.floor(Math.random() * videos?.length);
  const videoKey = videos[randomVideoIndex]?.key;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=cf1067f63c54fb71cd96ee9ab5a65975&append_to_response=videos&language=en-US`);
        setVideos(response.data?.results);
      } catch (error: any) {
        console.log(error);
        navigate('*');
      }

      setLoading(false);
    };

    fetchVideos();
  }, [movie?.id, navigate]);

  return (
    <div className="w-screen h-screen my-auto md:w-screen md:h-screen bg-black">
      <nav className="fixed w-full p-4 z-[999] flex flex-grow items-center gap-8 bg-black/95">
        <Link to="/browser">
          <AiOutlineArrowLeft className="text-white" size={40} />
        </Link>
        <p className="text-lg md:text-2xl text-white font-bold">
          <span className="font-light mr-1">Watching:</span>
          {movie?.title}
        </p>
      </nav>
      {!loading && (
        <iframe
          className="w-full h-full fixed md:static"
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&controls=1&rel=0`}
          title={movie?.title}
          allow="autoplay; encrypted-media; fullscreen"
        ></iframe>
      )}
    </div>
  );

};

export default WatchPage;