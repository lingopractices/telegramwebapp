import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import routes from '../routes/createMeetingRoutes';
import { CREATE_LANGUAGES_PATH } from '../routing.constants';
import mapRoutes from '../utils/mapRoutes';

const CreateMeetingRouter: React.FC = () => (
  <Routes>
    <Route path='' element={<Navigate to={CREATE_LANGUAGES_PATH} />} />
    {mapRoutes(routes)}
  </Routes>
);

export default CreateMeetingRouter;
