import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Http } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from 'ng2-translate';
// import hammerjs only if needed :
// From https://material.angular.io/guide/getting-started#additional-setup-for-gestures
// Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures
// In order to get the full feature-set of these components, HammerJS must be loaded into the application
// import 'hammerjs';

// import RxJs needed operators only once
import './rxjs-operators';
import { createTranslateLoader } from '../shared/helpers/aot.helper';
import { LANGUAGES } from './injection-tokens';
import { environment } from './../../environments/environment';
import { getRootReducer } from './../shared/states/root.reducer';
import { RuntimeEnvironmentService } from 'app/core/runtime-environment.service';

/**
 * this module will be imported only once, in AppModule and shouldn't be imported from anywhere else
 * you can define here the modules and providers that you only want to import once
 */
@NgModule({
  imports: [
    // START : Do not add your libs here
    BrowserAnimationsModule,
    // TODO : Keep an eye on ngrx V3 to have lazy loaded reducers
    // https://github.com/ngrx/store/pull/269
    StoreModule.provideStore(getRootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http],
    }),
    // END : Do not add your libs here

    // pass every effect here, one per line
    // EffectsModule.runAfterBootstrap(YOUR_EFFECT_GOES_HERE),
  ],
  providers: [
    {
      provide: LANGUAGES,
      // order matters : The first one will be used by default
      // to be accuracte, it will depend if you've set environment.useBrowserLanguageAsDefault to true or not
      // if it's set to true, it'll first try to use the browser language and if not available, fallback to the
      // firt language of the following array
      useValue: ['en', 'fr'],
    },
    // use hash location strategy or not based on env
    {
      provide: LocationStrategy,
      useClass: environment.hashLocationStrategy
        ? HashLocationStrategy
        : PathLocationStrategy,
    },
    RuntimeEnvironmentService,
  ],
})
export class CoreModule {}
