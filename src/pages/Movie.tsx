import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import './Movie.css';

interface params {
  id: string
}

function Movie() {

  const [movie, setMovie] = useState({
    title: '',
    backdrop_path: '',
    genres: [
      {
        id: 0,
        name: ''
      },
    ],
    overview: '',
    homepage: '',
    release_date: '',
    vote_average: 0.0
  });

  const { id } = useParams<params>();

  useEffect(() => {

    (async function loadDetails() {

      console.log(id);

      const response = await api.get(`/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR',
        }
      });

      setMovie(response.data);

    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='movie'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
      <div className='main-container'>
        <h1>{movie.title}</h1>
        <p className='overview'>{movie.overview}</p>
        {movie.genres.map(genres => (
          <p key={genres.id}>{genres.name}</p>
        ))}
        {/* <p>{movie.release_date}</p> */}
        <p>{`Nota ${movie.vote_average}`}</p>
        {/* <p>{movie.homepage}</p> */}
      </div>
    </div>
  );
}

export default Movie;