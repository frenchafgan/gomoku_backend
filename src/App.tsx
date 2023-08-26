import Routes from './Routes';
import './styles/theme.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);


  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;