import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import { Link } from 'react-router-dom';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        <div className="row_posters_container">
          {movies?.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
