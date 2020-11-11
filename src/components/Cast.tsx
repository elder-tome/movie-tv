import React, { useState, useEffect } from 'react';
import api from '../services/api';

import './Cast.css';

interface props {
  id: string,
  media: string
}

interface cast {
  id: number,
  name: string,
  profile_path: string,
  order: number
}

function Cast(props: props) {

  const [cast, setCast] = useState<cast[]>([]);

  useEffect(() => {

    (async function loadDetails() {

      const response = await api.get(`/${props.media}/${props.id}/credits`, {
        params: {
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR'
        }
      });

      const responseFilterProfile_path = response.data.cast.filter( (cast: cast) => (
        cast.profile_path
      ));

      const responseOrder = responseFilterProfile_path.sort((cast1: cast, cast2: cast) => {
        if (cast1.order < cast2.order) return -1;
        if (cast1.order > cast2.order) return 1;
        return 0;
      })

      setCast(responseOrder);

    })();

  }, [props.media, props.id]);

  return (
    <>
      {cast.map(cast => (
        <div className='cast-container' key={cast.id}>
          <img className='photos' src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt="" />
          <p className='name'>{cast.name}</p>
        </div>
      ))}
    </>
  );
}

export default Cast;