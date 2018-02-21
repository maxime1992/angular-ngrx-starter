import { createFeatureSelector } from '@ngrx/store';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import { uiInitialState } from 'app/shared/states/ui/ui.initial-state';
import { IUi } from 'app/shared/states/ui/ui.interface';

export const selectUiState = createFeatureSelector<IUi>('ui');

export function uiReducer(
  ui: IUi = uiInitialState(),
  action: UiActions.All
): IUi {
  switch (action.type) {
    case UiActions.SET_LANGUAGE: {
      return {
        ...ui,
        language: action.payload.language,
      };
    }

    case UiActions.TOGGLE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: !ui.isSidenavVisible,
      };
    }

    case UiActions.OPEN_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: true,
      };
    }

    case UiActions.CLOSE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: false,
      };
    }

    default:
      return ui;
  }
}
