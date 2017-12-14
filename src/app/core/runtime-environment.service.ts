import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable()
export class RuntimeEnvironmentService implements CanActivate {
  // you should define the environment type accordingly to your data
  public environment: any = {};

  constructor(private http: HttpClient) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (environment.loadRuntimeEnvironment) {
      // here you can conditionally load the environment of your choice
      // for example based on URL
      // by default, load runtime-environment
      return this.http
        .get('assets/runtime-environments/runtime-environment.json')
        .pipe(
          // TODO: add type
          tap(env => (this.environment = env)),
          mapTo(true),
          catchError(_ => {
            console.error(
              'Error while trying to fetch the runtime environment'
            );

            return of(false);
          })
        );
    }

    // if environment.loadRuntimeEnvironment is set to false, then we just want
    // to move forward and do not 1) load the json file, 2) wait anymore
    return true;
  }
}
