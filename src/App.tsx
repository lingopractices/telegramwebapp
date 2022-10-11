import { useEffect, useMemo } from 'react';

import { getProfileRequestAction } from '@store/profile/actions';
import { useActionWithDispatch } from 'hooks/use-action-with-dispatch';
import { useDispatch, useSelector } from 'react-redux';
import MainRouter from 'routing/routers/MainRouter';
import { getProfileDataSelector } from 'store/profile/selectors';

const App = () => {
  const dispatch = useDispatch();

  const getProfile = useActionWithDispatch(getProfileRequestAction);

  useEffect(() => {
    getProfile();

    // dispatch(getProfileRequestAction());
    // dispatch(
    //   UpdateProfileRequestAction({
    //     userId: 81,
    //     gender: 2,
    //     countryName: 'Poland',
    //     practiceLanguageId: 'ru',
    //     interfaceLanguageId: 'ru',
    //     languageLevel: 5,
    //   }),
    // );
    // dispatch(
    //   getMeetingsAction({
    //     languageId: 'en',
    //     languageLevel: 3,
    //     from: '2022-10-24T14:15:22Z',
    //     userId: 81,
    //     page: {
    //       offset: 0,
    //       limit: 20,
    //     },
    //   }),
    // );
    // dispatch(
    //   getMeetingDaysAction({
    //     languageId: 'en',
    //     languageLevel: 4,
    //     from: '2022-11-29T10:10:22Z',
    //     userId: 81,
    //   }),
    // );
  }, [dispatch, getProfile]);

  const profileData = useSelector(getProfileDataSelector);

  const routing = useMemo(() => <MainRouter />, []);

  return (
    <div>
      <div>{routing}</div>
    </div>
  );
};

export default App;
