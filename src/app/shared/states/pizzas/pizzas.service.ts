import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { pizzaInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';
import {
  IPizzaBackendWithDetailsAndFk,
  IPizzaBackendWithDetailsAndFkUi,
} from 'app/shared/states/pizzas/pizzas.interfaces';
import { environment } from 'environments/environment';

// when creating a service, you should use an abstract class to describe your methods
// this way you'll have the possibility to :
// - make sure you've got the same parameters and return types between the real service and the mock
// - search for references in Visual Studio Code and find your mock aswell on a method
export abstract class PizzasService {
  abstract fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi>;
}

export class PizzasServiceImpl extends PizzasService {
  constructor(private http: HttpClient) {
    super();
  }

  fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi> {
    return this.http
      .get<IPizzaBackendWithDetailsAndFk>(
        `${environment.urlBackend}/pizzas/${id}`
      )
      .pipe(map(data => pizzaInitialState(data)));
  }
}
