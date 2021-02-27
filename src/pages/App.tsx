import React, { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useHistory, Link } from 'react-router-dom';

import media_player_logo2 from '../img/media_player_logo2.svg';
import mdi_menu from '../img/mdi_menu.svg';
import mdi_local_movies from '../img/mdi_local_movies.svg';
import mdi_tv from '../img/mdi_tv.svg';
import search from '../img/search.svg';
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

  function handleClickTrending(trending: trending) {
    history.push(`/${trending.media_type}/${trending.id}`);
  }

  function handleClickMovie(movie: movie) {
    history.push(`/movie/${movie.id}`);
  }

  function handleClickTv(tv: tv) {
    history.push(`/tv/${tv.id}`);
  }

  return (
    <div className="App">
      <Menu 
        className='menu' 
        customBurgerIcon={<img src={mdi_menu} alt=""/>}
        customCrossIcon={ false }
        width={250}
      >
        <img src={media_player_logo2} alt=""/>
        <Link to='/tv' className='link'>Ação</Link>
        <Link to='/tv' className='link'>Aventura</Link>
        <Link to='/tv' className='link'>Comédia</Link>
        <Link to='/tv' className='link'>Drama</Link>
        <Link to='/tv' className='link'>Ficção científica</Link>
        <Link to='/tv' className='link'>Romance</Link>
        <Link to='/tv' className='link'>Terror</Link>
      </Menu>
      <div className='header'>
        <h1 className='subtitle'>FILMES</h1>
      </div>
      <Link to='/search' className='button-search'>
        <img src={search} alt=""/>
      </Link>
      <div className='main-container'> 
        <h1 className='text'>Em cartaz</h1>
        <div className='list-container'>
          {trending.map(trending => (
            <button key={trending.id} onClick={() => handleClickTrending(trending)}>
              <img src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`} alt="" />
            </button>
          ))}
        </div>
        <h1 className='text'>Porximos Lançamentos</h1>
        <div className='list-container'>
          {movieListPopular.map(movie => (
            <button key={movie.id} onClick={() => handleClickMovie(movie)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            </button>
          ))}
        </div>
        <h1 className='text'>Melhores Notas</h1>
        <div className='list-container'>
          {tvListPopular.map(tv => (
            <button key={tv.id} onClick={() => handleClickTv(tv)}>
              <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
            </button>
          ))}
        </div>
        <h1 className='text'>Populares</h1>
        <div className='list-container'>
          {tvListPopular.map(tv => (
            <button key={tv.id} onClick={() => handleClickTv(tv)}>
              <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className='bar'>
        <Link to='/' className='link'>
          <img src={mdi_local_movies} alt=""/>
          FILMES
        </Link>
        <Link to='/tv' className='link'>
          <img src={mdi_tv} alt=""/>
          SÉRIES
        </Link>
      </div>
    </div>
  );
}

export default App;
