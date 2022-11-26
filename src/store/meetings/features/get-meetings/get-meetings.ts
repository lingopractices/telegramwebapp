import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getMeetingsSelector } from '@store/meetings/selectors';
import { IMeetingsState } from '@store/meetings/types';
import { MEETINGS_LIMITS } from '@utils/pagination-limits';
import { AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';
import {
  IGetMeetingsRequest,
  IMeeting,
  IPaginationParams,
  LanguageLevel,
} from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { GetMeetingsFailure } from './get-meetings-failure';
import { GetMeetingsSuccess } from './get-meetings-success';

interface IGetMeetingsPayload {
  languageId: string;
  languageLevel: LanguageLevel | null;
  from: Dayjs | null;
  to?: Dayjs | null;
}

export class GetMeetings {
  static get action() {
    return createDeferredAction<IGetMeetingsPayload>('meetings/GET_MEETINGS');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof GetMeetings.action>): SagaIterator {
      const { from: dayjsFrom, to: dayjsTo } = payload;

      const meetingsList = yield select(getMeetingsSelector);

      const page: IPaginationParams = {
        offset: meetingsList.length,
        limit: MEETINGS_LIMITS,
      };

      try {
        const { data } = GetMeetings.httpRequest.call(
          yield call(() =>
            GetMeetings.httpRequest.generator({
              ...payload,
              page,
              from: dayjsFrom?.toJSON(),
              to: dayjsTo?.toJSON(),
            }),
          ),
        );
        const hasMore = data.length >= page.limit;

        yield put(GetMeetingsSuccess.action({ data, hasMore }));
        meta?.deferred.resolve();
      } catch (e) {
        yield put(GetMeetingsFailure.action());
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IMeeting[]>, IGetMeetingsRequest>(
      MAIN_API.SEARCH_MEETINGS,
      HttpRequestMethod.Post,
    );
  }
}
