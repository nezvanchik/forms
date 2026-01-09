import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page.component',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchesPageComponent {
[x: string]: any;

  private fb = inject(FormBuilder);
  formUtils = FormUtils
  
  myForm = this.fb.group({
    gender: ['M', Validators.required],
    notification: [true, Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  });
  
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
