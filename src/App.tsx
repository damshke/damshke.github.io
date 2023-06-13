import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import Delivery from './components/Delivery';
import Tabs from './components/Tabs'

const App: React.FC = () => {
  return (
    <div className='App'>
        <Tabs />
    </div>
  );
};

export default App;
