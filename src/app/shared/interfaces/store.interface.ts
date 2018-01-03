import * as fromRouter from '@ngrx/router-store';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { RouterStateUrl } from '../states/router/router.selector';

export interface IStore {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  readonly ui: IUi;
}
