import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';

function App() {
  return (
    <div>
      <NavigationBar />
      <Showcase />
      <ItemWindow />
      <BottomBar />
    </div>
  );
}

export default App;
