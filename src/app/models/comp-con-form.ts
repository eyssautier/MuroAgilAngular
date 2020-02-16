import { FormGroup, ValidationErrors } from '@angular/forms';

export class CompConForm {
    form: FormGroup;
    errors: string[];
    procesando: boolean;

    public getError(controlName: string): ValidationErrors {
        const control = this.form.get(controlName);
        if (control.touched && control.errors != null) {
        return control.errors;
        }
        return null;
    }

    protected procesarError(err: any): void {
        this.procesando = false;
        if (err.status === 400) {
            const error = err.error;
            if (error != null && error.errors != null) {
                for (const campos in error.errors) {
                    if (error.errors.hasOwnProperty(campos)) {
                        this.errors = this.errors.concat(error.errors[campos]);
                    }
                }
            }
        }
    }
}
