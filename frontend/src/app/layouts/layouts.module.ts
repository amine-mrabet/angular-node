import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { DropdownModule } from 'primeng/primeng';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutsService } from './services/layouts.service';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DropdownModule
  ],
  exports: [BodyComponent, FooterComponent, HeaderComponent],
  declarations: [BodyComponent, FooterComponent, HeaderComponent],
  providers: [LayoutsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LayoutsModule { }
