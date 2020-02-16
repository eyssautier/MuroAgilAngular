import { SalTarea } from './sal-tarea';

export class SalEtapaConTareas {
    id: number;
    nombre: string;
    posicion: number;
    tareas: SalTarea[];

    constructor() {
        this.tareas = [];
    }
}