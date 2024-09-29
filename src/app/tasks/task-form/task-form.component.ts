import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { PersonService } from '../../persons/person.service'; // Ajusta la ruta según tu estructura
import { Persona } from '../../interfaces/person.interface'; // Asegúrate de tener la interfaz de Persona
import { Tarea } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  personas: Persona[] = [];
  personasSeleccionadas: Persona[] = [];
  personaBuscada: string = ''; // Para filtrar personas
  tareaId: number | null = null;
  esEditar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private personService: PersonService,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      nombrePersona: [''], // Campo para seleccionar persona
    });
  }

  ngOnInit() {
    this.cargarPersonas();
    
    // Leer el id de la tarea desde la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');  // Obtener el parámetro 'id'
      if (id) {
        this.tareaId = +id;  // Convertir el id a número
        this.esEditar = true;  // Si hay id, estamos editando
        this.cargarTarea(this.tareaId);  // Cargar los datos de la tarea para edición
      } else {
        this.esEditar = false;  // Si no hay id, es una nueva tarea
      }
    });
  }

  cargarTarea(id: number) {
    this.taskService.getTareaById(id).subscribe((tarea: Tarea) => {
      console.log('Tarea cargada para edición:', tarea);
      
      // Establecer los valores del formulario con los datos de la tarea
      this.taskForm.patchValue({
        nombreTarea: tarea.nombreTarea,
        fechaLimite: tarea.fechaLimite
      });
  
      // Cargar las personas asociadas
      this.personasSeleccionadas = tarea.personasAsociadas || [];
    });
  }

  cargarPersonas() {
    this.personService.getPersonas().subscribe(personas => {
      this.personas = personas;
      console.log('Personas cargadas:', this.personas);
      
    });
  }

  agregarPersona() {
    const personaSeleccionada = this.personas.find(p => p.nombreCompleto === this.taskForm.get('nombrePersona')?.value);
    
    if (personaSeleccionada) {
      if (!this.personasSeleccionadas.some(p => p.id === personaSeleccionada.id)) {
        this.personasSeleccionadas.push(personaSeleccionada);
        this.taskForm.get('nombrePersona')?.reset();
        console.log('personas seleccionadas:', this.personasSeleccionadas);
         // Limpiar el campo después de agregar
      } else {
        alert('Esta persona ya está agregada');
      }
    }
  }

  eliminarPersona(personaId: number) {
    this.personasSeleccionadas = this.personasSeleccionadas.filter(p => p.id !== personaId);
  }

  crearTarea() {
    if (this.taskForm.valid) {
      const nuevaTarea = {
        ...this.taskForm.value,
        estado: 'Pendiente',
        personasAsociadas: this.personasSeleccionadas
      };
      
      if (this.tareaId) {
        // Si existe un id, es una tarea en edición
        this.taskService.actualizarTarea(this.tareaId, nuevaTarea).subscribe(() => {
          console.log('Tarea actualizada');
        });
      } else {
        // Si no existe id, es una tarea nueva
        this.taskService.crearTarea(nuevaTarea).subscribe(() => {
          console.log('Tarea creada');
        });
      }
      
      this.taskForm.reset();
      this.personasSeleccionadas = [];
    }
  }
}
