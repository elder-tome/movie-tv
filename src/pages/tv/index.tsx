import { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Header from '../../components/header';
import api from '../../services/api';
import styles from './tv.module.css';

type tvData = {
  id: number,
  poster_path: string,
}
type propsTv = {
  onTheAir: Array<tvData>,
  popular: Array<tvData>,
  topRated: Array<tvData>
}

export default function Tv({ onTheAir, popular, topRated }: propsTv) {

  const [modal, setModal] = useState(false);

  function handleClik() {
    setModal(true);
  }

  function handleCancel() {
    setModal(false);
  }

  return (
    <div className={styles.tvContainer}>
      {/* <Header /> */}
      <div className={!modal ? styles.notActive : styles.modalContainer}>
        <div className={styles.modal}>
          <nav>
            <ul>
              <li>
                <Link href='/tv/genre/16'>
                  <a>Animação</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/10759'>
                  <a>Ação e Aventura</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/35'>
                  <a>Comédia</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/80'>
                  <a>Crime</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/99'>
                  <a>Documentário</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/18'>
                  <a>Drama</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/10765'>
                  <a>Ficção Científica e Fantasia</a>
                </Link>
              </li>
              <li>
                <Link href='/tv/genre/9648'>
                  <a>Mistério</a>
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
          <h2>Em exebição</h2>
          <div>
            {
              onTheAir.map(onTheAir => (
                onTheAir.poster_path &&
                <Link href={`/tv/${onTheAir.id}`} key={onTheAir.id}>
                  <a>
                    <Image
                      className={styles.image}
                      src={`https://image.tmdb.org/t/p/w200${onTheAir.poster_path}`}
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
                <Link href={`/tv/${popular.id}`} key={popular.id}>
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
                <Link href={`/tv/${topRated.id}`} key={topRated.id}>
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

  const responseOnTheAir = await api.get('/tv/on_the_air', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  const responsePopular = await api.get('/tv/popular', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  const responseTopRated = await api.get('/tv/top_rated', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: 1
    }
  });

  return {
    props: {
      onTheAir: responseOnTheAir.data.results,
      popular: responsePopular.data.results,
      topRated: responseTopRated.data.results
    },
    revalidate: 60 * 60 * 12
  }

}