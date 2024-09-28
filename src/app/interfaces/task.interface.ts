import { Persona } from "./person.interface";

export interface Tarea {
  id: number;
  estado: string;
  nombreTarea: string;
  fechaLimite: string;
  personasAsociadas: Persona[];
}
