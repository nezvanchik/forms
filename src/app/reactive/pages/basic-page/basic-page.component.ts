import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPageComponent {

private fb = inject(FormBuilder);

formUtils = FormUtils;

myForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  price: [0, [Validators.required, Validators.min(10)]],
  inStorage: [0, [Validators.required, Validators.min(0)]],
})

isValidField(field:string):boolean | null{
  return (this.myForm.controls[field].errors && this.myForm.controls[field].touched)
}

getfieldErrors(field:string):string | null{
  if(!this.myForm.controls[field]){
    return null;
        }
        const errors = this.myForm.controls[field].errors ?? {};
        for(const key of Object.keys(errors)){
        switch(key){
          case 'required':
            return 'Este campo es requerido';
            case 'minlength':
              return `Este campo debe tener al menos de ${errors['minlength'].requiredLength} caracteres`;
            case 'min':
              return `Valor minimo ${errors['min'].min} caracteres`;
        }
      }
      return null;
}

onSave(){
  if(this.myForm.invalid){
  this.myForm.markAllAsTouched();
  return;
}
console.log(this.myForm.value);
}


  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })
}
