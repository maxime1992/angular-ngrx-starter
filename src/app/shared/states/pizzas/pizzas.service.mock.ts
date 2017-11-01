import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { pizzaInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';
import {
  IPizzaBackendWithDetailsAndFk,
  IPizzaBackendWithDetailsAndFkUi,
} from 'app/shared/states/pizzas/pizzas.interfaces';
import { PizzasService } from 'app/shared/states/pizzas/pizzas.service';

// your mock should extends either the abstract class (PizzasService)
// or the implementation (PizzasServiceImpl)
// in most cases, you'll implement the abstract class but sometimes,
// you might want to override only some methods
export class PizzasServiceMock extends PizzasService {
  constructor() {
    super();
  }

  fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi> {
    const pizza: IPizzaBackendWithDetailsAndFk = {
      id,
      name: 'Some pizza',
      prices: [10, 15.5, 20],
      ingredientsIds: ['ingredientId1', 'ingredientId2', 'ingredientId3'],
    };

    return of(pizzaInitialState(pizza));
  }
}
