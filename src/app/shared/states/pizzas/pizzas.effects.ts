import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PizzasService } from 'app/shared/states/pizzas/pizzas.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import * as PizzasActions from './pizzas.actions';

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
  fetchPizzaDetails$: Observable<Action> = this.actions$
    .ofType(PizzasActions.FETCH_PIZZA_DETAILS)
    .switchMap((action: PizzasActions.FetchPizzaDetails) =>
      this.pizzasService
        .fetchPizza(action.payload.id)
        .map(pizza => new PizzasActions.FetchPizzaDetailsSuccess(pizza))
        .catch(err => {
          if (environment.debug) {
            console.group();
            console.warn('Error caught in pizzas.effects:');
            console.error(err);
            console.groupEnd();
          }

          return Observable.of(
            new PizzasActions.FetchPizzaDetailsFailed({
              id: action.payload.id,
              error: err,
            })
          );
        })
    );
}
