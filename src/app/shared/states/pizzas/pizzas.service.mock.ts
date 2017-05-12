import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPizzaBackendWithDetailsAndFk, IPizzaBackendWithDetailsAndFkUi } from 'app/shared/states/pizzas/pizzas.interfaces';
import { environment } from 'environments/environment';
import { pizzaInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';
import { PizzasService } from 'app/shared/states/pizzas/pizzas.service';
import { responseBody } from 'app/shared/helpers/mock.helper';

// your mock should extends either the abstract class (PizzasService)
// or the implementation (PizzasServiceImpl)
// in most cases, you'll implement the abstract class but sometimes,
// you might to override only some methods
export class PizzasServiceMock extends PizzasService {
  constructor() { super(); }

  fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi> {
    const pizza: IPizzaBackendWithDetailsAndFk = {
      id,
      name: 'Some pizza',
      prices: [10, 15.5, 20],
      ingredientsIds: ['ingredientId1', 'ingredientId2', 'ingredientId3']
    };

    return Observable.of(pizzaInitialState(pizza));
  }
}
