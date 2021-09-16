import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// import Header from '../../../components/header';
import api from '../../../services/api';
import styles from './genre.module.css';

type tvData = {
  id: number,
  poster_path: string,
}
type genresData = {
  id: number,
  name: string,
}
type tvGenres = {
  idParams: string,
  tv: Array<tvData>,
  genres: Array<genresData>,
}

export default function Genre({ tv, genres, idParams }: tvGenres) {
  return (
    <div className={styles.genresContainer}>
      {/* <Header /> */}
      <main>
        {
          genres.map(genre => (
            String(genre.id) === idParams && <h2 key={genre.id} >{genre.name}</h2>
          ))
        }
        <div>
          {
            tv.map(tv => (
              tv.poster_path &&
              <Link href={`/tv/${tv.id}`} key={tv.id}>
                <a>
                  <Image
                    className={styles.image}
                    src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                    alt="Poster"
                    width={105}
                    height={154}
                    objectFit='cover'
                  />
                </a>
              </Link>
            ))
          }
        </div>
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

  const tvResponse = await api.get(`/discover/tv`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      sort_by: 'popularity.desc',
      with_genres: String(id),
      page: 1
    }
  });

  const genresResponse = await api.get(`/genre/tv/list`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
    }
  });

  return {
    props: {
      idParams: id,
      genres: genresResponse.data.genres,
      tv: tvResponse.data.results
    },
    revalidate: 60 * 60 * 24
  }

}