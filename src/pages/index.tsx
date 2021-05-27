import Head from '../components/Head';
// import { slide as Menu } from 'react-burger-menu';

// import styles from '../styles/tv.module.css';

export default function Tv() {
  return (
    <div className='container'>
      <Head />
      <header>
        {/* <Menu
          className='menu'
          customBurgerIcon={<img src={mdi_menu} alt="" />}
          customCrossIcon={false}
          width={250}
        > */}
        <h1>Tv</h1>
      </header>
      <main></main>
    </div>
  );
}
