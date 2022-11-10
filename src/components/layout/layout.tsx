import React, { useMemo, lazy } from 'react';

import { store } from '@store/store';

const MainRouter = lazy(async () => {
  const [
    initModule,
    authModule,
    usersModule,
    myProfileModule,
    settingsModule,
    chatsModule,
    friendsModule,
    internet,
  ] = await Promise.all([
    import('@store/initiation/sagas'),
    import('@store/auth/module'),
    import('@store/users/module'),
    import('@store/my-profile/module'),
    import('@store/settings/module'),
    import('@store/chats/module'),
    import('@store/friends/module'),
    import('@store/internet/module'),
  ]);

  store.inject([
    [StoreKeys.AUTH, authModule.reducer, authModule.authSagas],
    [StoreKeys.INITIATION, undefined, initModule.initiationSaga],
    [StoreKeys.USERS, usersModule.reducer, usersModule.usersSaga],
    [StoreKeys.MY_PROFILE, myProfileModule.reducer, myProfileModule.myProfileSagas],
    [StoreKeys.SETTINGS, settingsModule.reducer, settingsModule.settingsSaga],
    [StoreKeys.CHATS, chatsModule.reducer, chatsModule.chatSaga],
    [StoreKeys.FRIENDS, friendsModule.reducer, friendsModule.friendsSaga],
    [StoreKeys.INTERNET, internet.reducer, internet.internetSagas],
  ]);

  return import('routing/routers/MainRouter');
});

export const Layout: React.FC = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return routing;
};
