import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { call, put } from 'redux-saga/effects';

import { GetSelectedMeetingSuccess } from './get-selected-meeting-success';

export class GetSelectedMeetingRequest {
  static get action() {
    return createAction<number>('meetings/GET_SELECTED_MEETING_REQUEST');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getSelectedMeetingPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getSelectedMeeting({
      payload,
    }: ReturnType<typeof GetSelectedMeetingRequest.action>) {
      const { data } = yield call(() => GetSelectedMeetingRequest.httpRequest.generator(payload));
      yield put(GetSelectedMeetingSuccess.action(data));
    };
  }

  static get httpRequest() {
    return httpRequestFactory(
      (meetingId: number) => replaceInUrl(MAIN_API.GET_MEETING_BY_ID, ['meetingId', meetingId]),
      HttpRequestMethod.Get,
    );
  }
}
