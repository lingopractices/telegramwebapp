import { IAlertState } from '@store/alerts/types';
import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { AxiosResponse } from 'axios';
import { ICreateNotificationPreference, INotificationPreferenceDto } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { CreateAlertFailure } from './create-alert-failure';
import { CreateAlertSuccess } from './create-alert-success';

export class CreateAlert {
  static get action() {
    return createDeferredAction<ICreateNotificationPreference>(
      'notifications/CREATE_NOTIFICATION_PREFERENCES',
    );
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.createNotificationsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof CreateAlert.action>): SagaIterator {
      try {
        const { data: id } = CreateAlert.httpRequest.call(
          yield call(() => CreateAlert.httpRequest.generator(payload)),
        );

        if (id) {
          const notification: INotificationPreferenceDto = {
            id,
            languageId: payload.languageId,
            languageLevel: payload.languageLevel,
          };

          yield put(CreateAlertSuccess.action(notification));
          meta?.deferred.resolve();
        }
      } catch (e) {
        yield put(CreateAlertFailure.action());
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<number>, ICreateNotificationPreference>(
      MAIN_API.CREATE_NOTIFICATIONS_PREFERENCES,
      HttpRequestMethod.Post,
    );
  }
}
