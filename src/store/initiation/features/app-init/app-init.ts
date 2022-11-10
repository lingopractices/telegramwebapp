import { createAction } from '@reduxjs/toolkit';
import { GetMyMeetings } from '@store/meetings/features/get-my-meetings/get-my-meetings';
import { GetProfile } from '@store/profile/features/get-profile/get-profile';
import { SagaIterator } from 'redux-saga';
import { put } from 'redux-saga/effects';

export class AppInit {
  static get action() {
    return createAction('INIT');
  }

  static get saga() {
    return function* (): SagaIterator {
      yield put(GetProfile.action());
      yield put(GetMyMeetings.action());
    };
  }
}
