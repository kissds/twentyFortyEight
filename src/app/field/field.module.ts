import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';

const COMPONENTS = [
    FieldComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
      CommonModule
  ],
  exports: [...COMPONENTS]
})
export class FieldModule { }
