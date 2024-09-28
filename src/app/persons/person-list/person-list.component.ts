import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Persona } from '../../interfaces/person.interface';  // Importar la interfaz

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  personas: Persona[] = [];  // Lista de personas
  columnas: string[] = ['id', 'nombreCompleto', 'edad', 'habilidades']; // Columnas que se mostrarán

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.cargarPersonas();  // Cargar las personas cuando el componente se inicializa
  }

   // Método para cargar todas las personas desde el API
  cargarPersonas(): void {
    this.personService.getPersonas().subscribe(
      (data: Persona[]) => {
        // Truncar los IDs y asignar a personas
        this.personas = data.map(persona => ({
          ...persona,
          //id: Number(persona.id.toString().slice(0, 3)) // Truncar ID a los primeros 3 dígitos
        }));
      },
      (error) => {
        console.error('Error al cargar las personas:', error);
      }
    );
  }

  

  // Método para eliminar una persona
  eliminarPersona(id: number): void {
    this.personService.deletePersona(id).subscribe(
      () => {
        console.log('Persona eliminada con éxito');
        this.personas = this.personas.filter(persona => persona.id !== id);  // Actualizar la lista de personas
      },
      (error) => {
        console.error('Error al eliminar la persona:', error);
      }
    );
  }
}
