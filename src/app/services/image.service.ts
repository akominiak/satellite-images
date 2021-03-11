import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage(lat: string, lon: string): Observable<any> {
    let query = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.2&date=2020-03-10&api_key=DEMO_KEY`;
    return this.http.get(query, { responseType: 'blob' });
  }
}
