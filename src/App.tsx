import { useEffect, useMemo } from 'react';

import 'base.scss';
import './dayjs/day';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getMyMeetingsAction } from '@store/meetings/actions';
import { getProfileAction } from '@store/profile/actions';
import { getProfileDataSelector } from '@store/profile/selectors';
import { useSelector } from 'react-redux';
import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const getProfile = useActionWithDispatch(getProfileAction);
  const getMyMeetings = useActionWithDispatch(getMyMeetingsAction);
  const user = useSelector(getProfileDataSelector);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (user) {
      getMyMeetings();
    }
  }, [user, getMyMeetings]);

  const routing = useMemo(() => <MainRouter />, []);

  return user ? <div>{routing}</div> : null;
};

export default App;
