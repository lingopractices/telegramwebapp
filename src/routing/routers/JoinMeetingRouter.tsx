import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import routes from '../routes/joinMeetingRoutes';
import { JOIN_LANGUAGES_PATH } from '../routing.constants';
import mapRoutes from '../utils/mapRoutes';

const JoinMeetingRouter: React.FC = () => (
  <Routes>
    <Route path='' element={<Navigate to={JOIN_LANGUAGES_PATH} />} />
    {mapRoutes(routes)}
  </Routes>
);

export default JoinMeetingRouter;
