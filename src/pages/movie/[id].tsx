import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import api from '../../services/api';
import styles from './details.module.css';
import Header from '../../components/header';

type movieProps = {
  movie: {
    backdrop_path: string,
    poster_path: string,
    title: string,
    release_dates: {
      results: [
        {
          iso_3166_1: string,
          release_dates: [
            {
              certification: string
            }
          ]
        }
      ]
    },
    genres: [
      {
        id: number,
        name: string
      }
    ],
    vote_average: number,
    runtime: number,
    overview: string,
    homepage: string,
    original_title: string,
    release_date: string,
    production_companies: [
      {
        name: string,
        logo_path: string
      }
    ],
    credits: {
      cast: [
        {
          id: string,
          name: string,
          profile_path: string,
          character: string,
          order: string,
        }
      ],
    },
    videos: {
      results: [
        {
          id: string,
          name: string,
          key: string
        }
      ]
    }
  }
}

export default function Details({ movie }: movieProps) {
  return (
    <div className={styles.datailsContainer}>
      {/* <Header /> */}
      <main>
        <section>
          <section>
            <Image
              className={styles.backdrop}
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="Imagem de fundo"
              width={659}
              height={368}
              layout='fixed'
            />
            <div></div>
            <div className={styles.poster}>
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="Imagem de fundo"
                width={166}
                height={250}
                layout='fixed'
              />
            </div>
          </section>
          <section>
            <h1>{movie.title}</h1>
            {
              movie.release_dates.results.map(iten => (
                iten.iso_3166_1 === 'BR' &&
                <span key={iten.iso_3166_1} className={styles.contentRating}>{iten.release_dates[0].certification}</span>
              ))
            }
            <div className={styles.containerGenresEndDate}>
              {
                movie.genres.map((genres, index) => (
                  <span key={genres.id} >{
                    index != 0 ? `, ${genres.name}` : genres.name
                  }</span>
                ))
              }
              <span>{` .  (${movie.release_date.substr(0, 4)})`}</span>
            </div>
            <span className={styles.imdb}>
              <img src="/icons/IMDB.svg" alt="imdb" />
              {movie.vote_average}
            </span>
            <div className={styles.containerSpans}>
              {
                movie.runtime < 59 ?
                  <span>{
                    `${movie.runtime}min`
                  }</span>
                  :
                  <span>{
                    movie.runtime === 60 ?
                      `${(movie.runtime / 60).toFixed(0)}h`
                      :
                      `${(movie.runtime / 60).toFixed(0)}h ${movie.runtime % 60}min`
                  }</span>
              }
            </div>
            <h2>Sinopse</h2>
            <p>{movie.overview}</p>
            <a href={movie.homepage} target="_blank" >
              <img src="/icons/vector.svg" alt="assistir" />
              Assista agora
            </a>
          </section>
        </section>
        <section>
          <h2>informações</h2>
          <div>
            <h3>Nome original</h3>
            <span>{movie.original_title}</span>
            {/* <h3>Status</h3>
            {
              movie.in_production ? <span>Em produção</span> : <span>produção finalizada</span>
            } */}
            <h3>Lançamento</h3>
            <span>
              {new Date(Date.parse(movie.release_date)).toLocaleDateString('pt-BR')}
            </span>
            <h3>Emissora</h3>
            {
              movie.production_companies[0].logo_path || movie.production_companies[0].logo_path != '' ?
                <img
                  src={`https://image.tmdb.org/t/p/h50${movie.production_companies[0].logo_path}`.replace('png', 'svg')}
                  alt="imagem da emissora"
                  height={50}
                />
                :
                <span>{movie.production_companies[0].name}</span>
            }
          </div>
        </section>
        <section>
          {
            movie.credits.cast.length > 0 &&
            <h2>Elenco</h2>
          }
          <div>
            {
              movie.credits.cast.map((cast, index) => (
                <div key={index}>
                  {
                    cast.profile_path ?
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                        alt="foto do ator"
                        width={95}
                        height={107}
                        layout="fixed"
                        objectFit="none"
                      />
                      :
                      <img
                        src={`/icons/notFound.svg`}
                        alt="foto não encontrada"
                      />
                  }
                  <footer>
                    <span>{cast.name}</span>
                    <span>{cast.character}</span>
                  </footer>
                </div>
              ))
            }
          </div>
        </section>
        <section>
          {
            movie.videos.results.length > 0 &&
            <h2>Trailers</h2>
          }
          <div>
            {
              movie.videos.results.map(videos => (
                <iframe
                  key={videos.id}
                  src={`https://www.youtube.com/embed/${videos.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { id } = context.params;

  const { data } = await api.get(`/movie/${id}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      append_to_response: 'release_dates,credits,videos',
    }
  });

  return {
    props: {
      movie: data
    },
    revalidate: 60 * 60 * 24
  }

}