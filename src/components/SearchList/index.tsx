// import { GetServerSideProps, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { SearchContext } from '../../contexts/SearchContext';
import api from '../../services/api';

import styles from './searchList.module.css';

type searchListData = {
  id: number,
  media_type: string,
  title?: string,
  name?: string,
  poster_path: string,
  release_date?: string,
  first_air_date?: string
}

type searchListProps = {
  results: Array<searchListData>
}

export default function SearchList() {

  const { search, loadSearch } = useContext(SearchContext);
  const [midia, setMidia] = useState<searchListProps>();

  useEffect(() => {
    async function load() {

      const response = await api.get('/search/multi', {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR',
          query: search,
          page: 1
        }
      });

      setMidia(response.data);
    }
    load();
  }, [search]);

  function emptySearch() {
    loadSearch('');
  }

  return (
    <div className={styles.searchListContainer}>
      {/* midia.results.length !== 0 ? */}
      {midia ?
        midia.results.map(iten => (
          iten.poster_path &&
          <Link key={iten.id} href={`/${iten.media_type}/${iten.id}`}>
            <button className={styles.card} onClick={emptySearch} >
              <img width='70' height='112' src={`https://image.tmdb.org/t/p/w200${iten.poster_path}`} alt="" />
              <div>
                <h2>{iten.title || iten.name}</h2>
                <span>{iten.release_date?.substr(0, 4) || iten.first_air_date?.substr(0, 4)}</span>
              </div>
            </button>
          </Link>
        ))
        :
        <div className={styles.notFoundContainer}>
          <span>Nenhum resultado encontrado</span>
          <img src="/icons/emoji.svg" width='80' height='80' alt="emoji triste" />
        </div>
      }
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {

  // const response = await api.get('/search/multi', {
  //   params: {
  //     api_key: process.env.NEXT_PUBLIC_API_KEY,
  //     language: 'pt-BR',
  //     query: 'viuva',
  //     page: 1
  //   }
  // });

//   return {
//     props: {
//       list: { mensage: 'ola' },
//     },
//     revalidate: 60 * 60 * 12
//   }

// }