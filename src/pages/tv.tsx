import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';

import api from '../services/api';
import Head from '../components/Head';
import styles from '../styles/tv.module.css';

interface Itv {
  id: number,
  poster_path: string,
}

export default function Tv() {

  const [onTheAir, setOnTheAir] = useState<Itv[]>([]);
  const [popular, setPopular] = useState<Itv[]>([]);
  const [topRated, settopRated] = useState<Itv[]>([]);

  useEffect(() => {

    async function loadList() {
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

      setOnTheAir(responseOnTheAir.data.results);
      setPopular(responsePopular.data.results);
      settopRated(responseTopRated.data.results);
    }

    loadList();

  }, []);

  return (
    <div className={styles.container}>
      <Head />
      <header>
        <Menu
          className={styles.menu}
          customBurgerIcon={
            <Image
              src="/icons/menu.svg"
              alt="menu"
              width={30}
              height={30}
            />
          }
          customCrossIcon={false}
          width={180}
        >
          <Image
            src="/icons/logo.svg"
            alt="movie tv"
            width={140}
            height={36}
          />
          <nav>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Filmes</a></li>
              <li><a href="#">Séries</a></li>
              <li><a href="#">Sobre</a></li>
            </ul>
          </nav>
        </Menu>
        <input type="text" placeholder="Buscar por Filme ou Série" />
      </header>
      <main>
        <button>Gênero</button>
        <h2>Em exebição</h2>
        <div>
          {onTheAir.map(onTheAir => (
            <Link key={onTheAir.id} href="#">
              <a>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${onTheAir.poster_path}`}
                  alt="Imagem da Série"
                  width={96}
                  height={154}
                />
              </a>
            </Link>
          ))}
        </div>
        <h2>Populares</h2>
        <div>
          {popular.map(popular => (
            <Link key={popular.id} href="#">
              <a>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${popular.poster_path}`}
                  alt="Imagem da Série"
                  width={96}
                  height={154}
                />
              </a>
            </Link>
          ))}
        </div>
        <h2>Melhores Notas</h2>
        <div>
          {topRated.map(topRated => (
            <Link key={topRated.id} href="#">
              <a>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${topRated.poster_path}`}
                  alt="Imagem da Série"
                  width={96}
                  height={154}
                />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
