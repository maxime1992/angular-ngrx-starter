import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from 'ng2-translate';

// we now have to import every sub modules of material we want to use
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

const MaterialModules = [
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdRippleModule,
  MdSidenavModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSelectModule,
];

/**
 * this module should be imported in every sub-modules
 * you can define here the modules, components, pipes that you want to re-use all over your app
 */
export const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule,
  StoreModule,
  TranslateModule,
  PrettyJsonModule,
  ...MaterialModules,
];

export const declarations = [];

@NgModule({
  imports: modules,
  exports: [...modules, ...declarations],
  declarations,
})
export class SharedModule {}
