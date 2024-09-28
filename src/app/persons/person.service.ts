import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8000/tareas/personas';  // URL de tu API REST

  constructor(private http: HttpClient) {}

  // Obtener todas las personas (GET)
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  // Obtener una persona por ID (GET)
  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva persona (POST)
  addPersona(persona: Persona): Observable<Persona> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Persona>(this.apiUrl, persona, { headers });
  }

  // Actualizar una persona existente (PUT)
  updatePersona(id: number, persona: Persona): Observable<Persona> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona, { headers });
  }

  // Eliminar una persona (DELETE)
  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
