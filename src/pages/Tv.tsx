
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Cast from '../components/Cast';
import api from '../services/api';
import './Tv.css';

interface params {
  id: string
}

// interface cast {
//   id: number,
//   name: string,
//   profile_path: string,
//   order: number
// }
interface video {
  id: number,
  name: string,
  key: string
}

function Tv() {

  const [tv, setTv] = useState({
    name: '',
    backdrop_path: '',
    genres: [
      {
        id: 0,
        name: ''
      },
    ],
    overview: '',
    homepage: '',
    first_air_date: '',
    episode_run_time: [0],
    in_production: true,
    number_of_seasons: 0,
    number_of_episodes: 0,
    vote_average: 0.0
  });

  // const [cast, setCast] = useState<cast[]>([]);
  const [video, setVideo] = useState<video[]>([]);

  const { id } = useParams<params>();

  useEffect(() => {

    (async function loadDetails() {

      console.log(id);

      const response = await api.get(`/tv/${id}`, {
        params: {
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR'
        }
      });
      // const responseCast = await api.get(`/tv/${id}/credits`, {
      //   params: {
      //     api_key: process.env.REACT_APP_TOKEN,
      //     language: 'pt-BR'
      //   }
      // });

      let responseVideo = await api.get(`/tv/${id}/videos`, {
        params: {
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR'
        }
      });

      if (responseVideo.data.results.length <= 0) {
        responseVideo = await api.get(`/tv/${id}/videos`, {
          params: {
            api_key: process.env.REACT_APP_TOKEN,
            language: 'en-US'
          }
        });

        setVideo(responseVideo.data.results);

      }
      else {
        setVideo(responseVideo.data.results);
      }

      setTv(response.data);
      // setCast(responseCast.data.cast);

    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='tv'>
      <img src={`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`} alt="" />
      <div className='main-container'>
        <h1>{tv.name}</h1>
        <p>{tv.first_air_date}</p>
        <p>{tv.in_production ? 'Em Produção' : 'Produção finalizada'}</p>
        <p>{`Nota ${tv.vote_average}`}</p>
        {tv.genres.map(genres => (
          <p key={genres.id}>{genres.name}</p>
        ))}
        <p className='overview'>{tv.overview}</p>
        <p>{`${tv.number_of_seasons} Temporada(s)`}</p>
        <p>{`${tv.number_of_episodes} Episódeos`}</p>
        <p>{`${tv.episode_run_time} minutos`}</p>
        <Cast  media='tv' id={id}/>
        {video.map(video => (
          <div className='video-container'>
            <div className='videos' key={video.id}>
              <p>{video.name}</p>
              <p>{`https://www.youtube.com/watch?v=${video.key}`}</p>
            </div>
          </div>
        ))}
        <p>{tv.homepage}</p>
      </div>
    </div>
  );
}

export default Tv;