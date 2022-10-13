import { useMemo } from 'react';

import MainRouter from 'routing/routers/MainRouter';
import 'base.scss';
import './dayjs/day';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <div>{routing}</div>;
};

export default App;
