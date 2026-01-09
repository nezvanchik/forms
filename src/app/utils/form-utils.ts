import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

 

export class FormUtils {
     static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
      static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      case 'min':
        return `Valor mínimo ${errors['min'].min}`;
      case 'minLengthArray':
        return `Debe tener al menos ${errors['minLengthArray'].requiredLength} elementos`;
      case 'name':
        return 'Debe de ser en formato de nombre y apellido';  
      case 'email':
        return 'Debe de ser en formato de email';
      case 'username':
          return 'El username no puede ser Strider';
      case 'password':
        return 'La contraseña debe de ser mayor de 6 caracteres';
      case 'confirmPassword':
        return 'Las contraseñas deben de ser iguales';
      default:
        return `Error inesperado ${key}`;
    }
  }
  return null;
}

  static isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getfieldErrors(myForm: FormGroup, field: string): string | null {
    if (!myForm.controls[field]) {
      return null;
    }
    const errors = myForm.controls[field].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }
  static getFieldErrorsInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) {
      return null;
    }
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }
  static minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length >= min) {
        return null;
      }
      return { minLengthArray: { requiredLength: min } };
    };
  }
}
