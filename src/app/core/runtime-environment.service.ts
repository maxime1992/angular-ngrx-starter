import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';

@Injectable()
export class RuntimeEnvironmentService implements CanActivate {
  // you should define the environment type accordingly to your data
  public environment: any = {};

  constructor(private http: Http) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (environment.loadRuntimeEnvironment) {
      // here you can conditionally load the environment of your choice
      // for example based on URL
      // by default, load runtime-environment
      return this.http
        .get('assets/runtime-environments/runtime-environment.json')
        .map(res => res.json())
        .do(environment => (this.environment = environment))
        .mapTo(true)
        .catch(_ => {
          throw new Error(
            'Error while trying to fetch the runtime environment'
          );
        });
    }

    // if environment.loadRuntimeEnvironment is set to false, then we just want
    // to move forward and do not 1) load the json file, 2) wait anymore
    return true;
  }
}
