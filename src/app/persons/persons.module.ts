import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto

import { PersonFormComponent } from './person-form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonsRoutingModule } from './person-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PersonFormComponent,
    PersonListComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    PersonFormComponent,
    PersonListComponent
  ]
})
export class PersonsModule { }
