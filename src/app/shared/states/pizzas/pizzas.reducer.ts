import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import { pizzasInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interfaces';

export function pizzaReducer(
  pizzasTable: IPizzasTable = pizzasInitialState(),
  action: PizzasActions.All
): IPizzasTable {
  switch (action.type) {
    case PizzasActions.FETCH_PIZZA_DETAILS: {
      // here, notice that the action.payload is typed accordingly to this action
      return {
        ...pizzasTable,
        byId: {
          ...pizzasTable.byId,
          [action.payload.id]: {
            ...pizzasTable.byId[action.payload.id],
            isFetchingDetails: true,
          },
        },
      };
    }

    case PizzasActions.FETCH_PIZZA_DETAILS_SUCCESS: {
      return {
        ...pizzasTable,
        byId: {
          ...pizzasTable.byId,
          [action.payload.id]: {
            ...pizzasTable.byId[action.payload.id],
            ...action.payload,
            isFetchingDetails: false,
          },
        },
      };
    }

    case PizzasActions.FETCH_PIZZA_DETAILS_FAILED: {
      return {
        ...pizzasTable,
        byId: {
          ...pizzasTable.byId,
          [action.payload.id]: {
            ...pizzasTable.byId[action.payload.id],
            isFetchingDetails: false,
            isFetchingDetailsError: action.payload.error,
          },
        },
      };
    }

    default:
      return pizzasTable;
  }
}
