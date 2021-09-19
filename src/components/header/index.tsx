import { ChangeEvent, useContext, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link'

import { SearchContext } from '../../contexts/SearchContext';

import styles from './header.module.css';

export default function Header() {

  const { search, loadSearch } = useContext(SearchContext);
  const [open, setOpen] = useState(false);

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    loadSearch(event.target.value);
  }

  function handleOnOpen() {
    setOpen(true);
  }
  function handleOnClose() {
    setOpen(false);
  }

  function handleClick() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <Menu
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        isOpen={open}
        className={styles.menu}
        customBurgerIcon={
          <img
            src="/icons/menu.svg"
            alt="menu"
          />
        }
        customCrossIcon={false}
        width={230}
      >
        <img src="/icons/logo.svg" alt="movie tv" />
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">
                <a onClick={handleClick}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/movie">
                <a onClick={handleClick}>Filmes</a>
              </Link>
            </li>
            <li>
              <Link href="/tv">
                <a onClick={handleClick}>Séries</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a onClick={handleClick}>Sobre</a>
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
