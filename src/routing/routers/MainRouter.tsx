import React, { useEffect } from 'react';

import { AppInit } from '@store/initiation/features/app-init/app-init';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import routes from '../routes/mainRoutes';
import { INSTANT_MAIN_PATH, MAIN_PATH } from '../routing.constants';
import mapRoutes from '../utils/mapRoutes';

const MainRouter: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppInit.action());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path={MAIN_PATH} element={<Navigate to={INSTANT_MAIN_PATH} />} />
        {mapRoutes(routes)}
      </Routes>
    </div>
  );
};

export default MainRouter;
