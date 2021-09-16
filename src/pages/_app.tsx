import { useState } from 'react';
import HeadComponent from '../components/HeadComponent';
import { SearchContext } from '../contexts/SearchContext';
import SearchList from '../components/SearchList';
import Header from '../components/header';



import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [search, setSearch] = useState('');

  function loadSearch(search: string) {
    setSearch(search);
  }

  return (
    <div>
      <SearchContext.Provider value={{ search, loadSearch }} >
        <HeadComponent />
        <Header />
        {
          search ?
            <SearchList />
            :
            <Component {...pageProps} />
        }
      </SearchContext.Provider>
    </div>
  )
}

export default MyApp;
