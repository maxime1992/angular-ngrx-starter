import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { enableBatching } from 'redux-batched-actions';

import { IStore } from 'app/shared/interfaces/store.interface';
import { uiReducer } from 'app/shared/states/ui/ui.reducer';
import { environment } from 'environments/environment';

// ------------------------------------------------------------------------------

export const reducers: ActionReducerMap<IStore> = {
  // pass your reducers here
  ui: uiReducer,
};

// ------------------------------------------------------------------------------

// if environment is != from production
// use storeFreeze to avoid state mutation
const metaReducersDev = [storeFreeze, enableBatching];

// enableBatching allows us to dispatch multiple actions
// without letting the subscribers being warned between the actions
// only at the end : https://github.com/tshelburne/redux-batched-actions
// can be very handy when normalizing HTTP response
const metaReducersProd = [enableBatching];

export const metaReducers = environment.production
  ? metaReducersProd
  : metaReducersDev;
