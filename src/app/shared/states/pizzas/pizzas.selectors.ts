import { createSelector } from '@ngrx/store';

import {
  pizzasAdapter,
  selectPizzasState,
} from 'app/shared/states/pizzas/pizzas.reducer';

// you can think of your selectors in two distinct cases :
// - 1) you'll pass your function directly to the `select` operator proposed by ngrx
// in this case, which is the simplest, you'll get the store directly and a `distinctUntilChanged`
// will be applied to your result without the need to do it yourself
// (and as you don't have an Observable, it'd be complicated)
// instead of returning a type any, you should be more specific
// export function getSomething(store: IStore): any {}

// - 2) you'll pass the whole observable of the store to your function (using the `pipe` operator)
// this might be useful if you're waiting for some value(s) to be available for example
// export function getSomethingElse(store$: Observable<IStore>): any {}

export const {
  // select the array of pizza ids
  selectIds: selectPizzaIds,

  // select the dictionary of pizza entities
  selectEntities: selectPizzaEntities,

  // select the array of pizzas
  selectAll: selectAllPizzas,

  // select the total pizza count
  selectTotal: selectPizzaTotal,
} = pizzasAdapter.getSelectors();

// by using the createSelector function you'll be able to
// keep excellent performance thanks to memoization
export const selectCurrentPizzaId = createSelector(
  selectPizzasState,
  pizzaState => pizzaState.selected
);

export const selectCurrentUser = createSelector(
  selectPizzaEntities,
  selectCurrentPizzaId,
  (pizzasEntities, pizzaId) => pizzasEntities[pizzaId]
);
