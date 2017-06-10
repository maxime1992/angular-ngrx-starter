import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { IStore } from 'app/shared/interfaces/store.interface';
import * as PizzasActions from './pizzas.actions';
import { PizzasService } from 'app/shared/states/pizzas/pizzas.service';
import { environment } from 'environments/environment';

@Injectable()
export class PizzasEffects {
  constructor(
    private store$: Store<IStore>,
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
