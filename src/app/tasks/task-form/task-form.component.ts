import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { PersonService } from '../../persons/person.service'; // Ajusta la ruta según tu estructura
import { Persona } from '../../interfaces/person.interface'; // Asegúrate de tener la interfaz de Persona

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

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private personService: PersonService
  ) {
    this.taskForm = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      nombrePersona: [''], // Campo para seleccionar persona
    });
  }

  ngOnInit() {
    this.cargarPersonas();
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
        estado: 'Pendiente', // o el estado que desees
        personasAsociadas: this.personasSeleccionadas        
      };
      this.taskService.crearTarea(nuevaTarea).subscribe(() => {
        this.taskForm.reset();
        this.personasSeleccionadas = [];
      });
    }
  }
}
