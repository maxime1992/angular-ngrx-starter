import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { delay, dematerialize, materialize } from 'rxjs/operators';

import { environment } from 'environments/environment';

/**
 * this simulates the behaviour of Angular's http module:
 * if the status code is not a 2XX, it will return a failing Observable
 */
export function response(status: number): Observable<Response> {
  return responseBody(null, status);
}

/**
 * this simulates the behaviour of Angular's http module:
 * if the status code is not a 2XX, it will return a failing Observable
 */
export function responseBody(
  body: string | Object | ArrayBuffer,
  status = 200
): Observable<Response> {
  const res = new Response(new ResponseOptions({ status, body }));

  if (status >= 200 && status < 300) {
    return of(res).pipe(delay(environment.httpDelay));
  } else {
    return _throw(res).pipe(
      materialize(),
      delay(environment.httpDelay),
      dematerialize()
    );
  }
}
