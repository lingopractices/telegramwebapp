import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { LeaveMeetingSuccess } from './leave-meeting-success';

interface ILeaveMeetingPayload {
  meetingId: number;
  userId: number;
}

export class LeaveMeeting {
  static get action() {
    return createDeferredAction<ILeaveMeetingPayload>('meetings/LEAVE_MEETING');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.leaveMeetingPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof LeaveMeeting.action>): SagaIterator {
      try {
        LeaveMeeting.httpRequest.call(
          yield call(() => LeaveMeeting.httpRequest.generator(payload)),
        );
        yield put(LeaveMeetingSuccess.action(payload.meetingId));
        meta?.deferred.resolve();
      } catch (e: any) {
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<null>, ILeaveMeetingPayload>(
      ({ meetingId, userId }: ILeaveMeetingPayload) =>
        replaceInUrl(MAIN_API.LEAVE_MEETING, ['meetingId', meetingId], ['userId', userId]),
      HttpRequestMethod.Delete,
    );
  }
}
