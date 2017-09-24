import { Action } from '@ngrx/store';

import { IPizzaBackendWithDetailsAndFkUi } from 'app/shared/states/pizzas/pizzas.interfaces';

// an issue has been opened for that : https://github.com/ngrx/example-app/issues/151
// and we might have to wait Typescript 2.4 to use it this way
// rn stands for: "reducer name"
// we'll be using this variable to prefix every actions
// this is useful in large projects in case you end up with 2 actions having the same type
// define this in all your *.actions.ts files and make sure to keep it unique
// const rn = '[Pizzas]';

/**
 * create one class per action and do not forget to add them at the end to the type All
 * this way, you'll be able to have type checking when dispatching and also in your reducers
 */
export const FETCH_PIZZA_DETAILS = 'Fetch pizza details';
export class FetchPizzaDetails implements Action {
  readonly type = FETCH_PIZZA_DETAILS;

  constructor(public payload: { id: string }) {}
}

export const FETCH_PIZZA_DETAILS_SUCCESS = 'Fetch pizza details success';
export class FetchPizzaDetailsSuccess implements Action {
  readonly type = FETCH_PIZZA_DETAILS_SUCCESS;

  constructor(public payload: IPizzaBackendWithDetailsAndFkUi) {}
}

export const FETCH_PIZZA_DETAILS_FAILED = 'Fetch pizza details failed';
export class FetchPizzaDetailsFailed implements Action {
  readonly type = FETCH_PIZZA_DETAILS_FAILED;

  constructor(public payload: { id: string; error: string }) {}
}

// list every action class here
export type All =
  | FetchPizzaDetails
  | FetchPizzaDetailsSuccess
  | FetchPizzaDetailsFailed;
