import { pizzaReducer } from 'app/shared/states/pizzas/pizzas.reducer';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interfaces';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';

describe(`Pizzas reducer`, () => {
  describe(PizzasActions.FETCH_PIZZA_DETAILS, () => {
    it(`should set UI variable if pizza exists`, () => {
      const initialState: IPizzasTable = {
        isAdding: false,
        isAddingError: '',

        byId: {
          pizzaId0: {
            id: 'pizzaId0',
            name: 'Some pizza name',
            prices: [10, 15.2, 20],
            ingredientsIds: ['ingredientId0', 'ingredientId1'],

            isFetchingDetails: false,
            isFetchingDetailsError: '',
            isRemoving: false,
            isRemovingError: '',
            isEditingName: false,
            isEditingNameError: ''
          }
        },
        allIds: ['pizzaId0']
      };

      const newState = pizzaReducer(initialState, new PizzasActions.FetchPizzaDetails({ id: 'pizzaId0' }));

      const expectedState: IPizzasTable = {
        isAdding: false,
        isAddingError: '',

        byId: {
          pizzaId0: {
            id: 'pizzaId0',
            name: 'Some pizza name',
            prices: [10, 15.2, 20],
            ingredientsIds: ['ingredientId0', 'ingredientId1'],

            isFetchingDetails: true,
            isFetchingDetailsError: '',
            isRemoving: false,
            isRemovingError: '',
            isEditingName: false,
            isEditingNameError: ''
          }
        },
        allIds: ['pizzaId0']
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
