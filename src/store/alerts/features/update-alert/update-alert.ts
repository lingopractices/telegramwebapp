import { IAlertState } from '@store/alerts/types';
import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { addPendingRequest } from '@utils/cancel-request';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { IUpdateNotificationPreference } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { UpdateAlertFailure } from './update-alert-failure';
import { UpdateAlertSuccess } from './update-alert-success';

export class UpdateAlert {
  static get action() {
    return createDeferredAction<IUpdateNotificationPreference>(
      'notifications/UPDATE_ALERT_PREFERENCES',
    );
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.updateNotificationsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof UpdateAlert.action>): SagaIterator {
      try {
        const resposne = UpdateAlert.httpRequest.call(
          yield call(() =>
            UpdateAlert.httpRequest.generator(payload, (token: CancelTokenSource) =>
              addPendingRequest(payload.id, token),
            ),
          ),
        );

        if (!resposne) {
          return;
        }

        if (resposne.status === 200) {
          yield put(UpdateAlertSuccess.action(payload));
          meta?.deferred.resolve();
        }
      } catch (e) {
        yield put(UpdateAlertFailure.action());
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<undefined>, IUpdateNotificationPreference>(
      MAIN_API.UPDATE_NOTIFICATIONS_PREFERENCES,
      HttpRequestMethod.Put,
    );
  }
}
