import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { Provider } from 'react-redux';
import store from './Store';
const App:React.FC = ()=>{
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' element={<Home/>}></Route>
      </BrowserRouter>
    </Provider>
  )
}
export default App;