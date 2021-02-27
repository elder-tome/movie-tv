import React, { useState, useEffect } from 'react';
import api from '../services/api';

import './Videos.css';

interface video {
  id: number,
  name: string,
  key: string
}
interface props {
  id: string
  media: string
}

function Videos(props: props) {

  const [video, setVideo] = useState<video[]>([]);

  useEffect(() => {

    (async function loardVideos() {

      let responseVideo = await api.get(`/${props.media}/${props.id}/videos`, {
        params: {
          api_key: process.env.REACT_APP_TOKEN,
          language: 'pt-BR'
        }
      });

      if (responseVideo.data.results.length <= 0) {
        responseVideo = await api.get(`/${props.media}/${props.id}/videos`, {
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

    })();

  }, [props.media,props.id]);

  return (
    <div className='video-container'>
      {video.map(video => (
        <div className='videos' key={video.id}>
          <p>{video.name}</p>
          <p>{`https://www.youtube.com/watch?v=${video.key}`}</p>
        </div>
      ))}
    </div>
  );
}

export default Videos;