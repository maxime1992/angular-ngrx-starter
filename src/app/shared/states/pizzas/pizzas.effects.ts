import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import { PizzasService } from 'app/shared/states/pizzas/pizzas.service';
import { environment } from 'environments/environment';

@Injectable()
export class PizzasEffects {
  constructor(
    // if needed, you can inject the store to get some part of
    // it with a `withLatestFrom` for example
    // private store$: Store<IStore>,
    private actions$: Actions,
    private pizzasService: PizzasService
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true })
  fetchPizzaDetails$: Observable<Action> = this.actions$.pipe(
    ofType<PizzasActions.FetchPizzaDetails>(PizzasActions.FETCH_PIZZA_DETAILS),
    switchMap(action =>
      this.pizzasService.fetchPizza(action.payload.id).pipe(
        map(pizza => new PizzasActions.FetchPizzaDetailsSuccess(pizza)),
        catchError(err => {
          if (environment.debug) {
            console.group();
            console.warn('Error caught in pizzas.effects:');
            console.error(err);
            console.groupEnd();
          }

          return of(
            new PizzasActions.FetchPizzaDetailsFailed({
              id: action.payload.id,
              error: err,
            })
          );
        })
      )
    )
  );
}
