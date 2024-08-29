import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' element={<Home/>}></Route>
      </BrowserRouter>
    </Provider>
  )
}
export default App;