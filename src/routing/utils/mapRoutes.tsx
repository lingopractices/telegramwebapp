import React from 'react';

import { Route } from 'react-router-dom';

import type { RouteObject } from '../routing.types';

const mapRoutes = (routes: RouteObject[]) =>
  routes.map((route) => {
    const {
      path,
      props: { element: PageComponent, children },
    } = route;

    console.log(route);

    return (
      <Route key={path} path={path} element={<PageComponent />}>
        {children}
      </Route>
    );
  });

export default mapRoutes;
