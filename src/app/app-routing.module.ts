import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

import { RuntimeEnvironmentService } from 'app/core/runtime-environment.service';
import { FeaturesModule } from 'app/features/features.module';
import { environment } from 'environments/environment';

// if you want to lazy load the features module,
// 1 - remove the `import { FeaturesModule } from ...`;
// 2 - remove the loadFeaturesModule function

// we cannot use shorthand like that:
// loadChildren: () => FeaturesModule
// to be AOT compliant, we need to create
// a named function and export the module
export function loadFeaturesModule() {
  return FeaturesModule;
}

const routes: Routes = [
  {
    path: '',
    canActivate: [RuntimeEnvironmentService],
    loadChildren: loadFeaturesModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: environment.preloadAllLazyLoadedModules
        ? PreloadAllModules
        : NoPreloading,
    }),
  ],
})
export class AppRoutingModule {}
