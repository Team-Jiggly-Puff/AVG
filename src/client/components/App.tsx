import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import Home from './Home';
import { Provider } from 'react-redux';
import store from '../store';
import Poll from './Poll';
import Profile from './Profile';
import Login from './Login';
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from './Layout';
import PollsPage from './PollsPage';
import PollCard from './PollCard';
import '../../../build/styles.css'
import { ProfileData } from 'types/userTypes';

const App = () => {
  const userData: ProfileData = useAppSelector(state => state.user);
  console.log(userData);
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='Home' element = {<Home/>}></Route>
            <Route path='polls' element={<PollsPage/>}></Route>
            <Route path='poll/:pollId' element={<Poll />}></Route>
            <Route path='profile' element={<Profile/>}></Route>
            <Route path='login' element={<Login/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
export default App;