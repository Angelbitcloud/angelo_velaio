import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: 'list', component: PersonListComponent },  // Página principal de personas
  { path: 'create', component: PersonFormComponent },  // Crear nueva persona
  { path: 'edit/:id', component: PersonFormComponent },  // Editar persona existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule {}
