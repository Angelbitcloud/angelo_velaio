import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: 'list', component: TaskListComponent },  // Página principal de tareas
  { path: 'create', component: TaskFormComponent },  // Crear nueva tarea
  { path: 'edit/:id', component: TaskFormComponent },  // Editar tarea existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
