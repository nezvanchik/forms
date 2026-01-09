import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
   formUtils = FormUtils
  

  myForm = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['',[Validators.required,  Validators.pattern(FormUtils.emailPattern)]],
    username: ['',[Validators.required, Validators.pattern(FormUtils.notOnlySpacesPattern)]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassword: ['',[Validators.required, Validators.minLength(6)]],
    
  },{
    validators: [ this.passwordMatch('password', 'confirmPassword')]
  })

  passwordMatch(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
        const password = formGroup.get(field1)?.value;
        const confirmPassword = formGroup.get(field2)?.value;
        return password === confirmPassword ? null : { passwordnotMatch: true };
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
