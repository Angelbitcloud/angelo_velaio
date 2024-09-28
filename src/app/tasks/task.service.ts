import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/task.interface';  // Importamos la interfaz Tarea

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/tareas';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.baseUrl);
  }

  // Obtener una tarea por ID
  getTareaById(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.baseUrl}/${id}`);
  }

  // Obtener tareas filtradas por estado
  getTareasPorEstado(estado: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.baseUrl}/estado/${estado}`);
  }

  // Borrado lógico de una tarea (DELETE)
  borrarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Actualizar una tarea existente (PUT)
  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.baseUrl}/${id}`, tarea);
  }

  // Crear una nueva tarea (POST)
  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.baseUrl, tarea);
  }
}