export class UsuarioMuro {
    idDuenno: number;
    idMuro: number;
    permiso: number;

    public static nombrePermiso(permiso: number): string {
        switch (permiso) {
            case 1:
                return 'Dueño';
            case 2:
                return 'Edición';
            default:
                return 'Lectura';
        }
    }
}
