import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';
import YouTube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const handleClick = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${"d85e20674a393e31a93867fa39f71c72"}&language=en-US`
      );

      if (response.data.results.length > 0) {
        const trailerKey = response.data.results[0].key;
        setMovie((prevMovie) => ({ ...prevMovie, trailerKey }));
        setShowTrailer(true);
      } else {
        console.log('No trailer available for this movie.');
      }
    } catch (error) {
      console.log('Error fetching trailer:', error);
    }
  };

  const handleCloseTrailer = () => {
    setMovie((prevMovie) => ({ ...prevMovie, trailerKey: '' }));
    setShowTrailer(false);
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header className={`banner ${showTrailer ? 'banner_with_trailer' : ''}`}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
      }}>
      {showTrailer ? (
        <div className="trailer_container">
          <button className="trailer_close" onClick={handleCloseTrailer}>
            X
          </button>
          <YouTube videoId={movie?.trailerKey} opts={opts} />
        </div>
      ) : (
        <div className="banner_contents">
          <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
          <div className="banner_buttons">
            <button className="banner_button" onClick={() => handleClick(movie)}>
              Play
            </button>
          </div>
          <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        </div>
      )}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
