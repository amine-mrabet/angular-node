import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from './components/loader/loader.component';
import { PlmTemplateDirective } from './directives/plm-template.directive';
import { LoaderService } from './services/loader.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { DropdownModule, SlideMenuModule } from 'primeng/primeng';
@NgModule({
  declarations: [
    LoaderComponent,
    PlmTemplateDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    CommonModule,
    SidebarModule,
    PanelMenuModule,
    SlideMenuModule,
    DropdownModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    LoaderComponent,
    PlmTemplateDirective,
    SidebarModule,
    PanelMenuModule,
    SlideMenuModule,
    DropdownModule
  ],
  providers: [LoaderService, MessageService,RequestInterceptorService]
})
export class SharedModule { }
