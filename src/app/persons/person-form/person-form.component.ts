import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,  } from '@angular/forms';
import { PersonService } from '../person.service'; // Importar el servicio
import { Persona } from '../../interfaces/person.interface';  // Importar la interfaz

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.personForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([]), // Inicializar el FormArray de habilidades
      nuevaHabilidad: [''] 
    });
  }

  // Acceso al FormArray de habilidades
  get habilidades() {
    return this.personForm.get('habilidades') as FormArray;
  }

// Método para agregar una nueva habilidad
agregarHabilidad() {
  const nuevaHabilidadValue = this.personForm.get('nuevaHabilidad')?.value.trim();

  // Verificar que no sea vacío antes de agregar
  if (nuevaHabilidadValue) {
    const nuevaHabilidadControl = this.fb.control(nuevaHabilidadValue, Validators.required);
    this.habilidades.push(nuevaHabilidadControl); // Agrega la habilidad al FormArray
  }

}


// Método para eliminar una habilidad por índice
eliminarHabilidad(index: number) {
  this.habilidades.removeAt(index); // Elimina la habilidad en el índice especificado
}

  // Método para crear una nueva persona
  crearPersona() {
    if (this.personForm.valid) {
      const nuevaPersona: Persona = {
        id: 0, // Este ID debe ser gestionado por el backend
        nombreCompleto: this.personForm.value.nombreCompleto,
        edad: this.personForm.value.edad,
        habilidades: this.personForm.value.habilidades
      };

      // Llamar al servicio para agregar la nueva persona vía API
      this.personService.addPersona(nuevaPersona).subscribe(
        (persona) => {
          console.log('Persona creada con éxito:', persona);
          // Aquí puedes limpiar el formulario o redirigir a otra página si es necesario
          this.personForm.reset(); // Opcional: limpiar el formulario después de enviar
        },
        (error) => {
          console.error('Error al crear la persona:', error);
        }
      );
    }
  }
}
