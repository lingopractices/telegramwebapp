import React, { useMemo } from 'react';

import MainRouter from 'routing/routers/MainRouter';
import 'base.scss';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <div>{routing}</div>;
};

export default App;
