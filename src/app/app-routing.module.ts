import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

import { RuntimeEnvironmentService } from 'app/core/runtime-environment.service';
import { environment } from 'environments/environment';

// if you don't want to lazy load the features module,
// simply put the loadFeaturesModule as value of loadChildren
// import { FeaturesModule } from './features/features.module';

// export function loadFeaturesModule() {
//   return FeaturesModule;
// }

const routes: Routes = [
  {
    path: '',
    canActivate: [RuntimeEnvironmentService],
    loadChildren: 'app/features/features.module#FeaturesModule',
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
