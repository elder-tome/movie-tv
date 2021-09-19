import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import api from '../../services/api';
import styles from './details.module.css';

type tvProps = {
  tv: {
    backdrop_path: string,
    poster_path: string,
    name: string,
    content_ratings: {
      results: [
        {
          iso_3166_1: string,
          rating: string
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
    number_of_seasons: number,
    number_of_episodes: number,
    episode_run_time: Array<number>,
    overview: string,
    homepage: string,
    original_name: string,
    in_production: false,
    first_air_date: string,
    networks: [
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

export default function Details({ tv }: tvProps) {
  return (
    <div className={styles.datailsContainer}>
      <main>
        <section>
          <section>
            <Image
              className={styles.backdrop}
              src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
              alt="Imagem de fundo"
              width={697}
              height={390}
              layout='fixed'
            />
            <div></div>
            <div className={styles.poster}>
              <Image
                src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                alt="Imagem de fundo"
                width={167}
                height={250}
                layout='fixed'
              />
              <div className={styles.containerContentRatingAndStar}>
                {
                  tv.content_ratings.results.map(iten => (
                    iten.iso_3166_1 === 'BR' &&
                    <span key={iten.iso_3166_1} className={styles.contentRating}>{iten.rating}</span>
                  ))
                }
                <span className={styles.star}>
                  <img src="/icons/star.svg" alt="estrela" />
                  {tv.vote_average}
                </span>
              </div>

            </div>
          </section>
          <section>
            <h1>{tv.name}</h1>
            <div className={styles.containerGenres}>
              {
                tv.genres.map((genres) => (
                  <Link href={`/tv/genre/${genres.id}`} key={genres.id}>
                    <a>
                      <span>{
                        genres.name
                      }</span>
                    </a>
                  </Link>
                ))
              }
            </div>
            <h2>Sinopse</h2>
            <p>{tv.overview}</p>
            {/* target="_blank" */}
            <Link href={tv.homepage} >
              <button>
                <img src="/icons/vector.svg" alt="assistir" />
                Assista agora
              </button>
            </Link>
          </section>
        </section>
        <section>
          <h2>informações</h2>
          <div className={styles.boxInfomation}>
            <h3>Nome original</h3>
            <span>{tv.original_name}</span>
            <h3>Status</h3>
            {
              tv.in_production ? <span>Em produção</span> : <span>produção finalizada</span>
            }
            <h3>Extréia</h3>
            <span>
              {new Date(Date.parse(tv.first_air_date)).toLocaleDateString('pt-BR')}
            </span>
            <h3>Duração</h3>
            <div className={styles.containerSpans}>
              <span>{`${tv.number_of_seasons} Temporada(s) . `}</span>
              <span>{`${tv.number_of_episodes} Ep(s) .  `}</span>
              {
                tv.episode_run_time.map((iten, index) => (
                  iten < 60 ?
                    <span key={iten}>{
                      index != 0 ? `/ ${iten}min` : `${iten}min`
                    }</span>
                    :
                    <span key={iten}>{
                      iten === 60 ?
                        index != 0 ? `/ 1h` : `1h`
                        :
                        index != 0 ? `/ ${Math.trunc(iten / 60)}h ${iten % 60}min` : `${Math.trunc(iten / 60)}h ${iten % 60}min`
                    }</span>
                ))
              }
            </div>
            <h3>Emissora</h3>
            {
              tv.networks[0].logo_path || tv.networks[0].logo_path != '' ?
                <div className={styles.boxNetworkLogo}>
                  <img
                    src={`https://image.tmdb.org/t/p/h50${tv.networks[0].logo_path}`.replace('png', 'svg')}
                    alt="imagem da emissora"
                    height={50}
                  />
                </div>
                :
                <span>{tv.networks[0].name}</span>
            }
          </div>
        </section>
        <section>
          {
            tv.credits.cast.length > 0 &&
            <h2>Elenco</h2>
          }
          <div>
            {
              tv.credits.cast.map(cast => (
                <div key={cast.id}>
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
            tv.videos.results.length > 0 &&
            <h2>Trailers</h2>
          }
          <div>
            {
              tv.videos.results.map(videos => (
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

  const { data } = await api.get(`/tv/${id}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      append_to_response: 'content_ratings,credits,videos',
    }
  });

  return {
    props: {
      tv: data
    },
    revalidate: 60 * 60 * 24
  }

}