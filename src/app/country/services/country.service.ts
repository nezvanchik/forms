import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interface/country.interfaces';

@Injectable({providedIn: 'root'})
export class CountryService {
private  baseUrl='https://restcountries.com/v3.1';
// private  baseUrl='https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders';
   private http= inject(HttpClient);

   private _region = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

   get region(): string[] {
    return [...this._region];
   }

 

   getCountryByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    console.log(region);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
   }

   getCountryByBorders(borders: string[]): Observable<Country[]>{
      if (!borders || borders.length === 0) return of([]);
      const url = `${this.baseUrl}/borders/${borders.join(',')}`;
    return this.http.get<Country[]>(url);
   }

    getCountries(){
    return this.http.get(`${this.baseUrl}/all`);
   }

   getCountryByCode(code: string): Observable<Country>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
   }

   
}
