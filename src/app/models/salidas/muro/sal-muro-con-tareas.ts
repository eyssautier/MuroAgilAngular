import { SalEtapaConTareas } from './sal-etapa-con-tareas';

export class SalMuroConTareas {
    idMuro: number;
    nombreMuro: string;
    fechaCreacion: string;
    fechaUltimaModificacion: string;
    permiso: number;
    etapas: SalEtapaConTareas[];

    constructor() {
        this.etapas = [];
    }
}
