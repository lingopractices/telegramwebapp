import React from 'react';

import Account from '@components/Account/Account';
import { Route, Routes } from 'react-router-dom';

import routes from '../routes/accountRoutes';
import mapRoutes from '../utils/mapRoutes';

const AccountRouter: React.FC = () => (
  <Routes>
    <Route path='' element={<Account />} />
    {mapRoutes(routes)}
  </Routes>
);

export default AccountRouter;
