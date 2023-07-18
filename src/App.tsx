import React from 'react';
import NavBar from './components/navBar';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import User from './screens/user';
import Posts from './screens/posts';
import AppContextProvider from './context/appContext';

const App = () => {
  return (
    <AppContextProvider>
      <NavBar />
      <Routes>
        <Route path='/posts/:id' element={<Posts />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
