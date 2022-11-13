import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';
import applyTheme from '@utils/apply-theme';
import { SagaIterator } from 'redux-saga';
import { apply } from 'redux-saga/effects';

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
    return function* (action: ReturnType<typeof ChangeTheme.action>): SagaIterator {
      yield apply(applyTheme, applyTheme, [action.payload]);
    };
  }
}
