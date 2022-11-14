import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';
import applyTheme from '@utils/apply-theme';
import { SagaIterator } from 'redux-saga';
import { apply } from 'redux-saga/effects';
import { ThemeService } from 'services/theme-service';

import { Theme } from '../models/theme';

export class ChangeTheme {
  static get action() {
    return createAction<Theme>('CHANGE_THEME');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof ChangeTheme.action>) => {
      draft.theme = payload;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof ChangeTheme.action>): SagaIterator {
      const themeService = new ThemeService();

      yield apply(applyTheme, applyTheme, [payload]);
      yield apply(themeService, themeService.initializeOrUpdate, [payload]);
    };
  }
}
