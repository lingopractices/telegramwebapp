import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import routes from '../routes/mainRoutes';
import { INSTANT_MAIN_PATH, MAIN_PATH } from '../routing.constants';
import mapRoutes from '../utils/mapRoutes';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path={MAIN_PATH} element={<Navigate to={INSTANT_MAIN_PATH} />} />
    {mapRoutes(routes)}
  </Routes>
);

export default MainRouter;
