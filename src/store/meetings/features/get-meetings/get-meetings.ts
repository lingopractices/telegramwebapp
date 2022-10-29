import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getMeetingsSelector } from '@store/meetings/selectors';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { parseDayjsToJSON } from '@utils/dateUtils';
import { MEETINGS_LIMITS } from '@utils/paginationLimits';
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
    return function* (action: ReturnType<typeof GetMeetings.action>): SagaIterator {
      const { payload } = action;
      const { from: dayjsFrom, to: DayjsTo } = payload;

      const user = yield select(getProfileDataSelector);
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
              userId: user.id,
              page,
              from: parseDayjsToJSON(dayjsFrom as Dayjs),
              to: parseDayjsToJSON(DayjsTo as Dayjs),
            }),
          ),
        );
        const hasMore = data.length >= page.limit;

        yield put(GetMeetingsSuccess.action({ data, hasMore }));
        action.meta?.deferred.resolve();
      } catch (e) {
        action.meta?.deferred.reject(e);
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
