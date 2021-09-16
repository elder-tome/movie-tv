import { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Header from '../../components/header';
import api from '../../services/api';
import styles from './movie.module.css';

type movieData = {
  id: number,
  poster_path: string,
}
type movieProps = {
  nowPlaying: Array<movieData>,
  popular: Array<movieData>,
  topRated: Array<movieData>
}

export default function Movie({ nowPlaying, popular, topRated }: movieProps) {

  const [modal, setModal] = useState(false);

  function handleClik() {
    setModal(true);
  }

  function handleCancel() {
    setModal(false);
  }

  return (
    <div className={styles.movieContainer}>
      {/* <Header /> */}
      <div className={!modal ? styles.notActive : styles.modalContainer}>
        <div className={styles.modal}>
          <nav>
            <ul>
              <li>
                <Link href='/movie/genre/878'>
                  <a>Ficção Científica</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/16'>
                  <a>Animação</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/10749'>
                  <a>Romance</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/35'>
                  <a>Comédia</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/53'>
                  <a>Thriller</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/18'>
                  <a>Drama</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/27'>
                  <a>Terror</a>
                </Link>
              </li>
              <li>
                <Link href='/movie/genre/28'>
                  <a>Ação</a>
                </Link>
              </li>
            </ul>
          </nav>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>

      <main className={modal ? styles.blur : ''}>
        <button onClick={handleClik} >Gêneros</button>
        <section>
          <h2>Em lançamento</h2>
          <div>
            {
              nowPlaying.map(nowPlaying => (
                nowPlaying.poster_path &&
                <Link href={`/movie/${nowPlaying.id}`} key={nowPlaying.id}>
                  <a>
                    <Image
                      className={styles.image}
                      src={`https://image.tmdb.org/t/p/w200${nowPlaying.poster_path}`}
                      alt="Imagem da Série"
                      width={105}
                      height={154}
                      objectFit='cover'
                    />
                  </a>
                </Link>
              ))
            }
          </div>
        </section>
        <section>
          <h2>Populares</h2>
          <div>
            {
              popular.map(popular => (
                popular.poster_path &&
                <Link href={`/movie/${popular.id}`} key={popular.id}>
                  <a>
                    <Image
                      className={styles.image}
                      src={`https://image.tmdb.org/t/p/w200${popular.poster_path}`}
                      alt="Imagem da Série"
                      width={105}
                      height={154}
                      objectFit='cover'
                    />
                  </a>
                </Link>
              ))
            }
          </div>
        </section>
        <section>
          <h2>Melhores Notas</h2>
          <div>
            {
              topRated.map(topRated => (
                topRated.poster_path &&
                <Link href={`/movie/${topRated.id}`} key={topRated.id}>
                  <a>
                    <Image
                      className={styles.image}
                      src={`https://image.tmdb.org/t/p/w200${topRated.poster_path}`}
                      alt="Imagem da Série"
                      width={105}
                      height={154}
                      objectFit='cover'
                    />
                  </a>
                </Link>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const responseNowPlaying = await api.get('/movie/now_playing', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  const responsePopular = await api.get('/movie/popular', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  const responseTopRated = await api.get('/movie/top_rated', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  return {
    props: {
      nowPlaying: responseNowPlaying.data.results,
      popular: responsePopular.data.results,
      topRated: responseTopRated.data.results
    },
    revalidate: 60 * 60 * 12
  }

}