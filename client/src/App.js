import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';

function App() {
  return (
    <div>
      <NavigationBar />
      <Showcase />
    </div>
  );
}

export default App;
