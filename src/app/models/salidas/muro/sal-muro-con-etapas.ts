import { SalEtapa } from './sal-etapa';

export class SalMuroConEtapas {
    idMuro: number;
    nombreMuro: string;
    fechaCreacion: string;
    fechaUltimaModificacion: string;
    permiso: number;
    etapas: SalEtapa[];

    constructor() {
        this.etapas = [];
    }
}
