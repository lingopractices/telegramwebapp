import { useMemo } from 'react';

import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <div>{routing}</div>;
};

export default App;
