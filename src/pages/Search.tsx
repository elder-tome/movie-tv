import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import media_player_logo3 from '../img/media_player_logo3.svg';
import mdi_clear from '../img/mdi_clear.svg';
import mdi_local_movies from '../img/mdi_local_movies.svg';
import mdi_tv from '../img/mdi_tv.svg';
import './Search.css';

function Search(){

  const history = useHistory();

  function close(){
    history.goBack();
  }

  return (
    <div className='Search'>
      <button className='close' onClick={close} >
        <img src={mdi_clear} alt=""/>
      </button>
      <div className='main-container'>
        <div className='secund-container'>
          <img src={media_player_logo3} alt=""/>
          <input type="text" placeholder='Pesquisar'/>
        </div>
        <div className='search-container'>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
          <button className='movie-tv'>
            <p>Vingadores: Ultimato</p>
            <p>2019</p>
          </button>
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

export default Search;