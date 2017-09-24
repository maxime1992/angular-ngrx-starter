import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { environment } from 'environments/environment';

/**
 * this module should be kept as small as possible and shouldn't be modified
 * if you feel like you want to add something here, you should take a look into SharedModule or CoreModule
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, SharedModule, AppRoutingModule],
  providers: [
    // use hash location strategy or not based on env
    {
      provide: LocationStrategy,
      useClass: environment.hashLocationStrategy
        ? HashLocationStrategy
        : PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
