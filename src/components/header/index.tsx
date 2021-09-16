import { ChangeEvent, useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link'

import { SearchContext } from '../../contexts/SearchContext';

import styles from './header.module.css';

export default function Header() {

  const { search, loadSearch } = useContext(SearchContext);

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    loadSearch(event.target.value);
  }

  return (
    <header className={styles.header}>
      <Menu
        className={styles.menu}
        customBurgerIcon={
          <img
            src="/icons/menu.svg"
            alt="menu"
          />
        }
        customCrossIcon={false}
        width={280}
      >
        <img src="/icons/logo.svg" alt="movie tv" />
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/movie">
                <a>Filmes</a>
              </Link>
            </li>
            <li>
              <Link href="/tv">
                <a>Séries</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Sobre</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Menu>
      <div className={styles.constainerInput}>
        <img src="/icons/search.svg" />
        <input
          type="search"
          placeholder="Buscar por Filme ou Série"
          value={search}
          onChange={handleInput}
        />
      </div>
    </header>
  );
}
