import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { signal } from '@angular/core';
import { Country } from '../../interface/country.interfaces';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-country-page.component',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.region);
  countries = signal(<Country[]>[]);
  borders = signal(<Country[]>[]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onformChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChange();
  
    onCleanup(() => {
      regionSubscription.unsubscribe();
    });
  });

  onRegionChange() { 
    return this.myForm.get('region')!.valueChanges.subscribe((region) => {
      this.countryService.getCountryByRegion(region!).subscribe((countries) => {
        console.log(countries);
      });
    });
  }


  formCountry = this.myForm.get('country');
  formBorder = this.myForm.get('border');
}
