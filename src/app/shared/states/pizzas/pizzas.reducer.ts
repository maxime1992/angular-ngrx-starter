import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import { pizzasInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';
import {
  IPizzaBackendWithDetailsAndFkUi,
  IPizzasTable,
} from 'app/shared/states/pizzas/pizzas.interfaces';

export const selectPizzasState = createFeatureSelector<IPizzasTable>('pizzas');

export const pizzasAdapter: EntityAdapter<
  IPizzaBackendWithDetailsAndFkUi
> = createEntityAdapter<IPizzaBackendWithDetailsAndFkUi>({
  selectId: (pizza: IPizzaBackendWithDetailsAndFkUi) => pizza.id,
  sortComparer: false,
});

export function pizzaReducer(
  pizzasTable: IPizzasTable = pizzasInitialState,
  action: PizzasActions.All
): IPizzasTable {
  switch (action.type) {
    case PizzasActions.FETCH_PIZZA_DETAILS: {
      // here, notice that the action.payload is typed accordingly to this action
      return pizzasAdapter.updateOne(
        { id: action.payload.id, changes: { isFetchingDetails: true } },
        pizzasTable
      );
    }

    case PizzasActions.FETCH_PIZZA_DETAILS_SUCCESS: {
      return pizzasAdapter.updateOne(
        { id: action.payload.id, changes: { isFetchingDetails: false } },
        pizzasTable
      );
    }

    case PizzasActions.FETCH_PIZZA_DETAILS_FAILED: {
      return pizzasAdapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            isFetchingDetails: false,
            isFetchingDetailsError: action.payload.error,
          },
        },
        pizzasTable
      );
    }

    default:
      return pizzasTable;
  }
}
