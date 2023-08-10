import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axios';
import './MovieDetails.css';

import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import Nav from './Nav';
const base_url = 'https://image.tmdb.org/t/p/original/';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const movieResponse = await axios.get(`/movie/${id}?api_key=${"d85e20674a393e31a93867fa39f71c72"}&language=en-US`);
        setMovie(movieResponse.data);

        // Fetch other movies of the same genre
        if (movieResponse.data.genres && movieResponse.data.genres.length > 0) {
          const genreId = movieResponse.data.genres[0].id;
          const genreResponse = await axios.get(
            `/discover/movie?api_key=${"d85e20674a393e31a93867fa39f71c72"}&language=en-US&with_genres=${genreId}`
          );
          setMoviesByGenre(genreResponse.data.results);
        }

        setIsLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        console.log('Error fetching movie details:', error);
        setIsLoading(false); // Set loading state to false in case of an error
      }
    }
    fetchData();
  }, [id]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const handlePlayTrailer = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${"d85e20674a393e31a93867fa39f71c72"}&language=en-US`
      );

      if (response.data.results.length > 0) {
        const trailerKey = response.data.results[0].key;
        setTrailerUrl(trailerKey);
      } else {
        console.log('No trailer available for this movie.');
      }
    } catch (error) {
      console.log('Error fetching trailer:', error);
    }
  };

  const handleCloseTrailer = () => {
    setTrailerUrl('');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message or spinner while fetching data
  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <Nav />
      <div className="movie_details">
        {movie && movie.backdrop_path && (
          <header
            className={`banner ${trailerUrl ? 'banner_with_trailer' : ''}`}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
              backgroundPosition: 'center center',
            }}
          >
            {trailerUrl ? (
              <div className="trailer_container">
                <button className="trailer_close" onClick={handleCloseTrailer}>
                  X
                </button>
                <YouTube videoId={trailerUrl} opts={opts} />
              </div>
            ) : (
              <div className="banner_contents">
                <h1 className="banner_title">{movie.title || movie.name || movie.original_name}</h1>
                <h1 className="banner_description">{truncate(movie.overview, 150)}</h1>
                <button className="banner_button" onClick={() => handlePlayTrailer(movie)}>
                  Watch Trailer
                </button>
              </div>
            )}
          </header>
        )}

        {/* Display other movies of the same genre */}
        <div className="row">
          <h2>Other {movie?.genres[0]?.name} Movies</h2>
          <div className="row_posters">
            {moviesByGenre.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <img className="row_poster" src={`${base_url}${movie.poster_path}`} alt={movie.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;
