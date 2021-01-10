import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import EntryPoint from './EntryPoint';

const App = () => {
  const { store, persistor } = reduxStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EntryPoint />
      </PersistGate>
    </Provider>
  );
};

export default App;
