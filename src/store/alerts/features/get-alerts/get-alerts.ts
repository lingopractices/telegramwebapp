import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { AxiosResponse } from 'axios';
import { INotificationPreferenceDto } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { GetAlertsSuccess } from './get-alerts-success';

export class GetAlerts {
  static get action() {
    return createAction('notifications/GET_NOTIFICATION_PREFERENCES');
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.getNotificationsPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* (): SagaIterator {
      try {
        const { data } = GetAlerts.httpRequest.call(
          yield call(() => GetAlerts.httpRequest.generator()),
        );

        yield put(GetAlertsSuccess.action(data));
      } catch (e) {
        // log
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<INotificationPreferenceDto[]>, undefined>(
      MAIN_API.GET_NOTIFICATIONS_PREFERENCES,
      HttpRequestMethod.Get,
    );
  }
}
