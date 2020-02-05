import React from 'react';
import Panes from './pages/Panes'
import {Helmet} from 'react-helmet'

const App = () => {
  return (
    <div>
      <Helmet>
        <title> Rooftify </title>
      </Helmet>
      <Panes/>
    </div>
  );
}

export default App;
