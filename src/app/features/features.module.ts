import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from 'app/features/features-routing.module';
import { FeaturesComponent } from 'app/features/features.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, FeaturesRoutingModule],
  declarations: [FeaturesComponent],
})
export class FeaturesModule {}
