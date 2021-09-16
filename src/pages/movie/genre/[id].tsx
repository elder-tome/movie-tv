import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Header from '../../../components/header';
import api from '../../../services/api';
import styles from './genre.module.css';

type movieData = {
  id: number,
  poster_path: string,
}
type genresData = {
  id: number,
  name: string,
}
type movieGenres = {
  idParams: string,
  movie: Array<movieData>,
  genres: Array<genresData>,
}

export default function Genre({ movie, genres, idParams }: movieGenres) {
  return (
    <div className={styles.genresContainer}>
      <Header />
      <main>
        {
          genres.map(genre => (
            String(genre.id) === idParams && <h2 key={genre.id} >{genre.name}</h2>
          ))
        }
        <div>
          {
            movie.map(movie => (
              movie.poster_path &&
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <a>
                  <Image
                    className={styles.image}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
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

  const movieResponse = await api.get(`/discover/movie`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      sort_by: 'popularity.desc',
      with_genres: String(id),
      page: 1
    }
  });

  const genresResponse = await api.get(`/genre/movie/list`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
    }
  });

  return {
    props: {
      idParams: id,
      genres: genresResponse.data.genres,
      movie: movieResponse.data.results
    },
    revalidate: 60 * 60 * 24
  }

}