import * as UiActions from './ui.actions';
import { uiInitialState } from './ui.initial-state';
import { IUi } from './ui.interface';

export function uiReducer(ui: IUi = uiInitialState(), action: UiActions.All): IUi {
  switch (action.type) {
    case UiActions.SET_LANGUAGE: {
      return {
        ...ui,
        language: action.payload.language
      };
    }

    case UiActions.TOGGLE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: !ui.isSidenavVisible
      };
    }

    case UiActions.OPEN_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: true
      };
    }

    case UiActions.CLOSE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: false
      };
    }

    default:
      return ui;
  }
}
