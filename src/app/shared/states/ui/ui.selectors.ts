import { createSelector } from '@ngrx/store';

import { selectUiState } from './ui.reducer';

export const getLanguage = createSelector(
  selectUiState,
  uiState => uiState.language
);

export const getIsSidenavVisible = createSelector(
  selectUiState,
  uiState => uiState.isSidenavVisible
);
