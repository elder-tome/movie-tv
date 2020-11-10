import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import './App.css';

interface movie {
  id: number,
  poster_path: string,
}
interface tv {
  id: number,
  poster_path: string,
}
interface trending {
  id: number,
  poster_path: string,
  media_type: string
}

function App() {

  const [trending, setTrending] = useState<trending[]>([]);
  const [movieListPopular, setMovieListPopular] = useState<movie[]>([]);
  const [tvListPopular, setTvListPopular] = useState<tv[]>([]);

  const history = useHistory();

  useEffect(() => {

    (async function loadList() {
      
      const responseTrending = await api.get('/trending/all/day', {
        params: { 
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR',
          page: 1
        }
      });

      const responseMovie = await api.get('/movie/popular', {
        params: { 
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR',
          page: 1
        }
      });

      const responseTv = await api.get('/tv/popular', {
        params: { 
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR',
          page: 1
        }
      });

      setTrending(responseTrending.data.results);
      setMovieListPopular(responseMovie.data.results);
      setTvListPopular(responseTv.data.results);

    })();

  }, []);
  
  function handleClickTrending(trending: trending){
    history.push(`/${trending.media_type}/${trending.id}`);
  }

  function handleClickMovie(movie: movie){
    history.push(`/movie/${movie.id}`);
  }

  function handleClickTv(tv: tv){
    history.push(`/tv/${tv.id}`);
  }

  return (
    <div className="App">
      <h1 className='tags'>TENDÊNCIAS DO DIA</h1>
      <div className='container'>
        {trending.map(trending => (
          <button key={trending.id} onClick={() => handleClickTrending(trending)}>
            <img src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`} alt=""/>
          </button>
        ))}
      </div>
      <h1 className='tags'>FILMES POPULARES</h1>
      <div className='container'>
        {movieListPopular.map(movie => (
          <button key={movie.id} onClick={() => handleClickMovie(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
          </button>
        ))}
      </div>
      <h1 className='tags'>SÉRIES POPULARES</h1>
      <div className='container'>
        {tvListPopular.map(tv => (
          <button key={tv.id} onClick={() => handleClickTv(tv)}>
            <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt=""/>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
