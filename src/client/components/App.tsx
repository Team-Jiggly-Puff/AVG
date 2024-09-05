import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './Home';
import { Provider } from 'react-redux';
import store from '../store';
import Poll from './Poll'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './NavBar';
import Layout from './Layout';
import PollsPage from './PollsPage';
import PollCard from './PollCard';
import '../../../build/styles.css'

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='Home' element = {<Home/>}></Route>
            <Route path='polls' element={<PollsPage/>}></Route>
            <Route path='poll/:pollId' element={<Poll />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}
export default App;