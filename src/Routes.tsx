import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import home from './pages/App';
import movie from './pages/Movie';
import tv from './pages/Tv';
import search from './pages/Search';

function Routes(){
  return(
    <BrowserRouter>
      <Route path='/' exact component={home} />
      <Route path='/search' component={search} />
      <Route path='/movie/:id' component={movie} />
      <Route path='/tv/:id' component={tv} />
    </BrowserRouter>
  );
}

export default Routes;