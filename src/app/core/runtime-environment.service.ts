import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';

// if you decide to use runtime environment,
// you should make sure this interface matches
// what will be returned by the server when
// reaching the environment
export interface IRuntimeEnvironment {}

/**
 * runtime environment service allows you to load async data
 * - you don't have to rebuild the app to refresh those data
 *   (like you do when using CLI environment)
 * - the `update` method can be used to update it at anytime
 * - if you've set `environment.loadRuntimeEnvironment` to true
 *   angular will wait for the runtime environment to be loaded
 *   before bootstraping the app, which means you can then inject
 *   RuntimeEnvironmentService and directly (in a synchronous way)
 *   use: `this.runtimeEnvironmentService.environment.myVar`
 */
@Injectable()
export class RuntimeEnvironmentService {
  // you should define the environment type accordingly to your data
  public environment: IRuntimeEnvironment = {};

  constructor(private http: HttpClient) {}

  update(): Observable<IRuntimeEnvironment> {
    // here you can conditionally load an async environment of your choice
    // for example based on URL
    return this.http
      .get<IRuntimeEnvironment>(
        'assets/runtime-environments/runtime-environment.json'
      )
      .pipe(
        tap(env => (this.environment = env)),
        catchError(_ => {
          console.error('Error while trying to fetch the runtime environment');

          return of(false);
        })
      );
  }
}

export function initRuntimeEnvironment(
  runtimeEnvironmentService: RuntimeEnvironmentService
): () => Promise<IRuntimeEnvironment> {
  if (environment.loadRuntimeEnvironment) {
    return () => runtimeEnvironmentService.update().toPromise();
  }

  // if environment.loadRuntimeEnvironment is set
  // to false then we just want to move forward
  return () => Promise.resolve(null);
}
