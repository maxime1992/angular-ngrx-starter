import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPizzaBackendWithDetailsAndFkUi, IPizzaBackendWithDetailsAndFk } from 'app/shared/states/pizzas/pizzas.interfaces';
import { environment } from 'environments/environment';
import { pizzaInitialState } from 'app/shared/states/pizzas/pizzas.initial-state';

// when creating a service, you should use an abstract class to describe your methods
// this way you'll have the possibility to :
// - make sure you've got the same parameters and return types between the real service and the mock
// - search for references in Visual Studio Code and find your mock aswell on a method
export abstract class PizzasService {
  abstract fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi>;
}

export class PizzasServiceImpl extends PizzasService {
  constructor(private http: Http) { super(); }

  fetchPizza(id: string): Observable<IPizzaBackendWithDetailsAndFkUi> {
    return this
      .http
      .get(`${environment.urlBackend}/pizzas/${id}`)
      .map((res: Response) => res.json() as IPizzaBackendWithDetailsAndFk)
      .map(data => pizzaInitialState(data));
  }
}
