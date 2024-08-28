import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
const App:React.FC = ()=>{
  return(
    <BrowserRouter>
      <Route path='/' element={Home}></Route>
    </BrowserRouter>
  )
}