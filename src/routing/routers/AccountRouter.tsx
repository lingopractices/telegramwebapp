import React from 'react';

import { Route, Routes } from 'react-router-dom';
import AccountScreen from 'screens/account/AccountScreen/AccountScreen';

import routes from '../routes/accountRoutes';
import mapRoutes from '../utils/mapRoutes';

const AccountRouter: React.FC = () => (
  <Routes>
    <Route path='' element={<AccountScreen />} />
    {mapRoutes(routes)}
  </Routes>
);

export default AccountRouter;
