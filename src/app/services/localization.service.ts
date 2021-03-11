import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  constructor(private http: HttpClient) { }

  getLocalizations(searchText: string): Observable<any> {
    let query = `https://nominatim.openstreetmap.org/?adressdetails=1&q=${searchText}&format=json`;
    return this.http.get(query);
  }
}
