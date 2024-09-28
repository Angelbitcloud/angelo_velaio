import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  // Los datos que serán personas o tareas
  @Input() data: any[] = [];

  // Las columnas que se mostrarán en la tabla
  @Input() displayedColumns: string[] = [];

  // Chequea si un valor es un array (para habilidades o personas en tareas)
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
