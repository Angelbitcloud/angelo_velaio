import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router'; // Importar Router
import { Tarea } from '../../interfaces/task.interface';  // Importar la interfaz Tarea

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tareas: Tarea[] = [];  // Lista de tareas
  columnas: string[] = ['id', 'nombreTarea', 'fechaLimite', 'NombreIntegrantes', 'Habilidades', 'estado']; // Agregar 'estado'

  constructor(private taskService: TaskService, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    this.cargarTareas();  // Cargar las tareas al inicializar el componente
  }

  obtenerNombresIntegrantes(tarea: Tarea): string {
    return tarea.personasAsociadas.map(persona => persona.nombreCompleto).join(', ');
  }

  obtenerHabilidades(tarea: Tarea): string {
    return tarea.personasAsociadas.flatMap(persona => persona.habilidades).join(', ');
  }

  // Método para cargar todas las tareas desde el API
  cargarTareas(): void {
    this.taskService.getTareas().subscribe(
      (data: Tarea[]) => {
        this.tareas = data.map(tarea => ({
          ...tarea,
          // Crea una nueva propiedad para mostrar los nombres
          NombreIntegrantes: tarea.personasAsociadas.map(persona => persona.nombreCompleto).join(', '),
          Habilidades: tarea.personasAsociadas.flatMap(persona => persona.habilidades),
          estado: tarea.estado // Asegúrate de que el campo estado esté presente en la respuesta del API
        }));
        console.log('Tareas cargadas:', this.tareas);
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  // Método para editar una tarea
  editarTarea(tarea: Tarea): void {
    // Navegar a la página de crear tarea con el ID de la tarea a editar
    this.router.navigate(['/task/edit', tarea.id]); 
    console.log(tarea.id);
    
  }

  // Método para actualizar el estado de una tarea
  cambiarEstado(id: number, nuevoEstado: string): void {
    // Buscar la tarea a actualizar
    const tareaAActualizar = this.tareas.find(tarea => tarea.id === id);
    
    if (tareaAActualizar) {
      // Clonar la tarea existente y actualizar el estado
      const tareaActualizada: Tarea = {
        ...tareaAActualizar, // Copiar todas las propiedades
        estado: nuevoEstado // Cambiar solo el estado
      };

      // Enviar el objeto actualizado al servicio
      this.taskService.actualizarTarea(id, tareaActualizada).subscribe(
        (data: Tarea) => {
          console.log('Tarea actualizada:', data);
          
          // Llamar a un método para cargar nuevamente las tareas
          this.cargarTareas(); // Método para cargar las tareas desde el backend
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }

  // Método para filtrar las tareas por estado
  filtrar(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    const estado = selectElement.value; // Obtiene el valor del select
  
    if (estado) {
      this.taskService.getTareasPorEstado(estado).subscribe(
        (data: Tarea[]) => {
          this.tareas = data.map(tarea => ({
            ...tarea,
            NombreIntegrantes: tarea.personasAsociadas.map(persona => persona.nombreCompleto).join(', '),
            Habilidades: tarea.personasAsociadas.flatMap(persona => persona.habilidades)
          }));
        },
        (error) => {
          console.error('Error al filtrar las tareas:', error);
        }
      );
    } else {
      this.cargarTareas();  // Si no hay estado, recargar todas las tareas
    }
  }
}
