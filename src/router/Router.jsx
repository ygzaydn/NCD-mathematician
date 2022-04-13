import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from '../pages/game/Game';
import Home from '../pages/homepage/Home';
import Results from '../pages/results/Result';

const Router = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Results />} />
    </Routes>
);

export default Router;
