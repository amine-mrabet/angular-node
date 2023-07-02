import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
