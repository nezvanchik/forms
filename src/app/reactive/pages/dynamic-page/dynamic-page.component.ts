import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;
 
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGame: this.fb.array(
      [
        this.fb.control('Metal Gear Solid', Validators.required),
        this.fb.control('Death Stranding', Validators.required)
      ],
      [Validators.required, FormUtils.minLengthArray(2)]
    )
  })

  newFavourite = this.fb.control('', Validators.required);

  get favouriteGames(){
    return this.myForm.get('favoriteGame') as FormArray;
  }
 onAddFavourite(){
  if(this.newFavourite.invalid){
    return;
  }
 const newGame = this.newFavourite.value;
  this.favouriteGames.push(this.fb.control(newGame, Validators.required));
  this.newFavourite.reset();
}

onRemoveFavourite(index: number){
  this.favouriteGames.removeAt(index);
}

onSubmit(){
  if(this.myForm.invalid){
    this.myForm.markAllAsTouched();
    return;
  }
  console.log(this.myForm.value);
}

}
