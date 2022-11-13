import { createAction } from '@reduxjs/toolkit';
import { GetMyMeetings } from '@store/meetings/features/get-my-meetings/get-my-meetings';
import { ChangeTheme } from '@store/profile/features/change-theme/change-theme';
import { GetProfile } from '@store/profile/features/get-profile/get-profile';
import { themeSelector } from '@store/profile/selectors';
import { SagaIterator } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

export class AppInit {
  static get action() {
    return createAction('INIT');
  }

  static get saga() {
    return function* (): SagaIterator {
      const theme = yield select(themeSelector);

      yield put(ChangeTheme.action(theme));
      yield put(GetProfile.action());
      yield put(GetMyMeetings.action());
    };
  }
}
