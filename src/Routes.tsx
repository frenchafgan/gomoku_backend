import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import GameHistory from './pages/GameHistory';
import GameLog from './pages/GameLog';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/games" element={<GameHistory />} />
        <Route path="/game-log/:id" element={<GameLog />} />
        {/* <ProtectedRoute path="/home" component={Home} /> */}

      </Routes>
    </Router>
  );
};

export default AppRoutes;
