import { createAction } from '@reduxjs/toolkit';
import { getTheme } from '@utils/get-telegram-theme';
import { SagaIterator } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { ThemeService } from 'services/theme-service';

import { ChangeTheme } from '../change-theme/change-theme';
import { Theme } from '../models/theme';

export class GetUserTheme {
  static get action() {
    return createAction('GET_USER_THEME');
  }

  static get saga() {
    return function* (): SagaIterator {
      const cachedTheme = new ThemeService().theme;
      const telegramTheme = getTheme();

      yield put(ChangeTheme.action(cachedTheme || telegramTheme || Theme.LIGHT));
    };
  }
}
