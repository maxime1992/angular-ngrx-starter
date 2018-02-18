import {
  IPizzaBackendWithDetailsAndFk,
  IPizzaBackendWithDetailsAndFkUi,
  IPizzasTable,
} from 'app/shared/states/pizzas/pizzas.interfaces';
import { pizzasAdapter } from 'app/shared/states/pizzas/pizzas.reducer';

/**
 * pass a pizza and return an pizza with its properties + missing ones
 * this function might be helpful to initialize pizzas coming from the server
 */
export function pizzaInitialState(
  pizza: IPizzaBackendWithDetailsAndFk
): IPizzaBackendWithDetailsAndFkUi {
  const emptyObj: IPizzaBackendWithDetailsAndFkUi = {
    id: '',
    name: '',
    prices: [],
    ingredientsIds: [],

    isFetchingDetails: false,
    isFetchingDetailsError: '',
    isRemoving: false,
    isRemovingError: '',
    isEditingName: false,
    isEditingNameError: '',
  };

  return { ...emptyObj, ...pizza };
}

/**
 * default state for IPizzasTable
 */
export const pizzasInitialState: IPizzasTable = pizzasAdapter.getInitialState({
  // additional entity state properties
  selected: '',
  isAdding: false,
  isAddingError: '',
});
